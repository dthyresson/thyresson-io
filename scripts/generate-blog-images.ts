import { fal } from '@fal-ai/client';
import fs from 'fs/promises';
import path from 'path';
import { program } from 'commander';
import { Langbase } from 'langbase';
import dotenv from 'dotenv';
import { input, select } from '@inquirer/prompts';

dotenv.config();
// Configure FAL AI client
fal.config({
  credentials: process.env.FAL_AI_KEY!,
});

// Configure Langbase client
const langbase = new Langbase({
  apiKey: process.env.LANGBASE_API_KEY!,
});

interface ProcessOptions {
  style?: string;
  period?: string;
  all?: boolean;
  imageSize?:
    | 'square_hd'
    | 'square'
    | 'portrait_4_3'
    | 'portrait_16_9'
    | 'landscape_4_3'
    | 'landscape_16_9';
  numImages?: number;
  model?: string;
}

interface Answers {
  style?: string;
  period?: string;
}

async function processPost(filePath: string, options: ProcessOptions) {
  console.log('\n=== Starting to process post:', filePath, '===');
  console.log('Options:', JSON.stringify(options, null, 2));

  // Read blog post content
  const content = await fs.readFile(filePath, 'utf-8');
  // console.log('Content length:', content.length, 'characters');

  // Get filename without extension for saving images
  const fileName = path.basename(filePath, '.md');
  console.log('Processing for fileName:', fileName);

  const variables = [
    {
      name: 'BLOG_POST',
      value: content,
    },
    options.style && {
      name: 'STYLE',
      value: options.style,
    },
    options.period && {
      name: 'PERIOD',
      value: options.period,
    },
  ].filter(Boolean) as { name: string; value: string }[];

  // console.log('Langbase variables:', JSON.stringify(variables, null, 2));

  console.log('Calling Langbase pipe...');

  const summaryPrompt = ``;
  // Process through Langbase pipe
  const { completion } = await langbase.pipe.run({
    messages: [{ role: 'user', content: summaryPrompt }],
    name: 'blog-post-gen-ai-image-prompt',
    stream: false,
    variables,
  });

  console.log('Generated prompt:', completion);

  let prompt = '';

  if (options.style) {
    prompt += `In artistic style of: ${options.style}. `;
  }
  if (options.period) {
    prompt += `In time period of: ${options.period}. `;
  }

  prompt += `The scene: ${completion}`;

  console.log('Calling FAL AI for image generation...');
  // console.log('Gen AI ImagePrompt:', prompt);

  const model = options.model || 'fast-sdxl';

  // Generate image using FAL AI
  const imageResult = await fal.subscribe(`fal-ai/${model}`, {
    input: {
      prompt,
      seed: Math.floor(Math.random() * 1000000),
      image_size: options.imageSize || 'landscape_16_9',
      num_images: options.numImages || 1,
    },
    logs: true,
    onQueueUpdate: (update) => {
      console.log(`FAL AI Status: ${update.status}`);
      if (update.status === 'IN_PROGRESS') {
        update.logs.map((log) => log.message).forEach(console.log);
      }
    },
  });

  console.log('FAL AI generation complete. Request ID:', imageResult.requestId);

  // Create images directory if it doesn't exist
  const imageDir = path.join(process.cwd(), 'generated_images', fileName);
  console.log('Creating image directory:', imageDir);
  await fs.mkdir(imageDir, { recursive: true });

  // Save the generated images
  for (let i = 0; i < imageResult.data.images.length; i++) {
    const image = imageResult.data.images[i];
    const fileExtension = image.content_type?.split('/')[1] ?? 'jpg';

    console.log('Downloading image from:', image.url);
    const imageResponse = await fetch(image.url);
    const imageBuffer = await imageResponse.arrayBuffer();

    const timestamp = Date.now();
    const imagePath = path.join(
      imageDir,
      `generated-${timestamp}-${i + 1}.${fileExtension}`
    );
    console.log('Saving image to:', imagePath);
    await fs.writeFile(imagePath, new Uint8Array(imageBuffer));

    // Save metadata alongside the image
    const metadata = {
      model,
      prompt: prompt,
      url: image.url,
      source: {
        filename: path.basename(filePath),
        path: filePath.split('/src/')[1] || filePath,
      },
      style: options.style || null,
      period: options.period || null,
      imageSize: options.imageSize,
      numImages: options.numImages,
      requestId: imageResult.requestId,
      seed: imageResult.data.seed,
      timestamp,
      width: image.width,
      height: image.height,
      contentType: image.content_type,
      filename: `generated-${timestamp}-${i + 1}.${fileExtension}`,
      hasNSFW: imageResult.data.has_nsfw_concepts?.[i] || false,
      inferenceTime: imageResult.data.timings?.inference,
    };
    const metadataPath = path.join(
      imageDir,
      `generated-${timestamp}-metadata.json`
    );
    console.log('Saving metadata to:', metadataPath);
    await fs.writeFile(metadataPath, JSON.stringify(metadata, null, 2));
  }

  console.log('=== Finished processing post ===\n');

  return {
    requestId: imageResult.requestId,
    imagePath: imageDir,
  };
}

async function main() {
  console.log('=== Starting blog image processing script ===');

  program
    .option('-s, --style <style>', 'Art style for image generation')
    .option('-p, --period <period>', 'Time period for image style')
    .option('-a, --all', 'Process all files')
    .option(
      '-i, --image-size <size>',
      'Image size ratio (square_hd, square, portrait_4_3, portrait_16_9, landscape_4_3, landscape_16_9)'
    )
    .option(
      '-n, --num-images <number>',
      'Number of images to generate',
      parseInt
    )
    .option(
      '-m, --model <model>',
      'FAL AI model to use (fast-sdxl, flux/schnell, flux/dev)'
    )
    .parse(process.argv);

  let options = program.opts();

  try {
    // First prompt: Model selection
    if (!options.model) {
      options.model = (await select({
        message: 'Select FAL AI model:',
        default: 'fast-sdxl',
        choices: [
          { name: 'Fast SDXL', value: 'fast-sdxl' },
          { name: 'Flux Schnell', value: 'flux/schnell' },
          { name: 'Flux Dev', value: 'flux/dev' },
        ],
      })) as ProcessOptions['model'];
    }

    const blogDir = path.join(process.cwd(), 'src/content/blog');
    console.log('Reading blog directory:', blogDir);
    const files = await fs.readdir(blogDir);
    const mdFiles = files.filter((f) => f.endsWith('.md'));
    console.log('Found', mdFiles.length, 'markdown files in blog directory');

    let selectedFile: string | undefined;

    if (!options.all) {
      // Second prompt: File selection
      selectedFile = await select({
        message: 'Select a blog post to process:',
        choices: mdFiles.map((file) => ({
          name: file.replace('.md', ''),
          value: file,
        })),
      });
    }

    // Prompt for missing style and period using input prompt
    if (!options.style) {
      options.style = await input({
        message:
          'Enter art style for image generation (empty will infer from post):',
      });
    }

    if (!options.period) {
      options.period = await input({
        message:
          'Enter time period for image style (empty will infer from post):',
      });
    }

    if (!options.imageSize) {
      options.imageSize = (await select({
        message: 'Select image size ratio:',
        default: 'landscape_16_9',
        choices: [
          { name: 'Square HD', value: 'square_hd' },
          { name: 'Square', value: 'square' },
          { name: 'Portrait 4:3', value: 'portrait_4_3' },
          { name: 'Portrait 16:9', value: 'portrait_16_9' },
          { name: 'Landscape 4:3', value: 'landscape_4_3' },
          { name: 'Landscape 16:9', value: 'landscape_16_9' },
        ],
      })) as ProcessOptions['imageSize'];
    }

    if (!options.numImages) {
      const numImagesInput = await input({
        message: 'Enter number of images to generate (1-4):',
        default: '1',
        validate: (value) => {
          const num = Number(value);
          return (
            (num >= 1 && num <= 4) || 'Please enter a number between 1 and 4'
          );
        },
      });
      options.numImages = Number(numImagesInput);
    }

    if (!options.all) {
      const result = await processPost(
        path.join(blogDir, selectedFile!),
        options
      );
      console.log(`Generated images saved for ${selectedFile}`);
      console.log('Request ID:', result.requestId);
      console.log('Images saved to:', result.imagePath);
    } else {
      // Process all files
      for (const file of mdFiles) {
        console.log('\n--- Starting new file ---');
        console.log(`Processing ${file}...`);
        const result = await processPost(path.join(blogDir, file), options);
        console.log(`Generated images saved for ${file}`);
        console.log('Request ID:', result.requestId);
        console.log('Images saved to:', result.imagePath);
        console.log('--- Finished file ---\n');
      }
    }

    console.log('=== All processing complete ===');
  } catch (error) {
    console.error('❌ Error processing blog posts:', error);
    process.exit(1);
  }
}

main();
