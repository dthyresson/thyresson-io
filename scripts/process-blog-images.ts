import { fal } from "@fal-ai/client";
import fs from 'fs/promises';
import path from 'path';
import { program } from 'commander';
import { Langbase } from 'langbase';
import dotenv from 'dotenv';
import inquirer from 'inquirer';

dotenv.config();
// Configure FAL AI client
fal.config({
  credentials: process.env.FAL_AI_KEY!
});

// Configure LangBase client
const langbase = new Langbase({
  apiKey: process.env.LANGBASE_API_KEY!
});

interface ProcessOptions {
  style?: string;
  period?: string;
  all?: boolean;
}

async function processPost(filePath: string, options: ProcessOptions) {
  console.log('\n=== Starting to process post:', filePath, '===');
  console.log('Options:', JSON.stringify(options, null, 2));

  // Read blog post content
  const content = await fs.readFile(filePath, 'utf-8');
  console.log('Content length:', content.length, 'characters');

  // Get filename without extension for saving images
  const fileName = path.basename(filePath, '.md');
  console.log('Processing for fileName:', fileName);

  const variables = [
    {
      name: 'blog_post',
      value: content
    },
    options.style && {
      name: 'style',
      value: options.style
    },
    options.period && {
      name: 'period',
      value: options.period
    }
  ].filter(Boolean) as { name: string; value: string }[];

  console.log('LangBase variables:', JSON.stringify(variables, null, 2));

  console.log('Calling LangBase pipeline...');
  // Process through LangBase pipeline
  const { completion } = await langbase.pipe.run({
    messages: [{ role: 'user', content: content }],
    name: 'blog-post-gen-ai-image-prompt',
    stream: false,
    variables,
  });

  console.log('Generated prompt:', completion);

  console.log('Calling FAL AI for image generation...');
  // Generate image using FAL AI
  const imageResult = await fal.subscribe("fal-ai/flux/dev", {
    input: {
      prompt: completion,
      seed: Math.floor(Math.random() * 1000000),
      image_size: "landscape_4_3",
      num_images: 1,
    },
    logs: true,
    onQueueUpdate: (update) => {
      console.log(`FAL AI Status: ${update.status}`);
      if (update.status === "IN_PROGRESS") {
        update.logs.map((log) => log.message).forEach(console.log);
      }
    }
  });

  console.log('FAL AI generation complete. Request ID:', imageResult.requestId);

  // Create images directory if it doesn't exist
  const imageDir = path.join(process.cwd(), 'src/images', fileName);
  console.log('Creating image directory:', imageDir);
  await fs.mkdir(imageDir, { recursive: true });

  // Save the generated image
  const imageUrl = imageResult.data.images[0].url;
  console.log('Downloading image from:', imageUrl);
  const imageResponse = await fetch(imageUrl);
  const imageBuffer = await imageResponse.arrayBuffer();

  const imagePath = path.join(imageDir, `generated-${Date.now()}.png`);
  console.log('Saving image to:', imagePath);
  await fs.writeFile(imagePath, new Uint8Array(imageBuffer));

  console.log('=== Finished processing post ===\n');

  return {
    requestId: imageResult.requestId,
    imagePath: imageDir
  };
}

async function main() {
  console.log('=== Starting blog image processing script ===');

  program
    .option('-s, --style <style>', 'Art style for image generation')
    .option('-p, --period <period>', 'Time period for image style')
    .option('-a, --all', 'Process all files')
    .parse(process.argv);

  const options = program.opts();
  console.log('Command line options:', JSON.stringify(options, null, 2));

  try {
    const blogDir = path.join(process.cwd(), 'src/content/blog');
    console.log('Reading blog directory:', blogDir);
    const files = await fs.readdir(blogDir);
    const mdFiles = files.filter(f => f.endsWith('.md'));
    console.log('Found', mdFiles.length, 'markdown files in blog directory');

    if (!options.all) {
      // Show interactive file selection
      const { selectedFile } = await inquirer.prompt([
        {
          type: 'list',
          name: 'selectedFile',
          message: 'Select a blog post to process:',
          choices: mdFiles.map(file => ({
            name: file.replace('.md', ''),
            value: file
          }))
        }
      ]);

      const result = await processPost(path.join(blogDir, selectedFile), options);
      console.log(`Generated image saved for ${selectedFile}`);
      console.log('Request ID:', result.requestId);
      console.log('Image saved to:', result.imagePath);
    } else {
      // Process all files
      for (const file of mdFiles) {
        console.log('\n--- Starting new file ---');
        console.log(`Processing ${file}...`);
        const result = await processPost(path.join(blogDir, file), options);
        console.log(`Generated image saved for ${file}`);
        console.log('Request ID:', result.requestId);
        console.log('Image saved to:', result.imagePath);
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
