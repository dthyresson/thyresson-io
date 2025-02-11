---
title: "Psycholinguistics: Neural Networks and Chomsky's Rule-Based Language Theory"
description: "An exploration of how neural network computer models challenge Chomsky's notion that language is rule-based, examining key research in psycholinguistics."
pubDate: '16 Oct 1996'
updatedDate: '11 Feb 2025'
heroImage: '/lm-a-g3JNrSAgsIqZ5kyU.png'
tags: ['Psycholinguistics', 'Neural Networks', 'Chomsky']
---

# Psycholinguistics - Presentation Outline

**_Note:_** Written in 1996 at Middlebury College for a Psycholinguistics class.

## Neural Networks and Chomsky Notion That Language is Rule-Based

### Introduction

#### How developments in neural network computer models are beginning to question Chomsky's notion that language is ruled-based.

1. The neural network models show that computers can, by being trained and without possessing given/innate rules, quite successfully form past tenses of verbs (including irregular forms) and distinguish between grammatically correct and incorrect sentences.

#### So, what is a neural network.

##### Daniel Story -- UC Berkeley

1. 1.5 ago, living in Berkeley with cousin working on Ph.D. in Astrophysics.
2. he was doing research into entropy of gas molecules in galaxy formation
3. one night, I met him up in lab; showed me something he was learning
4. on the monitor were a bunch of circles with lines connecting them, and they were flickering and changing connections.
5. looked something like this (SHOW Neural Network Model)
6. lines were bouncing around, and it seemed like it was doing something, I just didn't know what
7. he pointed to some graph on the screen and said, "See, it's learning."
8. stared blankly and said I'd go pick up some Chinese food
9. what he was showing me was a very simple neural network with about 6 units that was attempting limited character recognition -- and over time it was being trained to become more accurate. It WAS learning.
10. without rules, it was teaching itself how to recognize letters of the alphabet
    k. similar neural network models are being used in the Newton for handwriting recognition, in stock markets to forecast market trends, and expert systems are being made to try to drive cars and even predict complex interaction systems, like galaxy formation

#### The appeal of neural networks

1. they can learn without relying on rules

#### So, again, what is a neural network?

##### A. The Neural Network

1. neural networks are models based on research into how our human minds process information, store it, and make decisions based on that information
2. the computer model tries to recreate how interconnected neurons communicate with one another to store information and perform cognitive tasks
   B. Explanation
3. Briefly, a neural network consists of computation units (also called cells) and a set of one-way data connections joining the units. SHOWN IN FIGURE!
4. At certain times a unit examines its inputs and computes a signed number called an activation as its output.
5. The new activation is then passed along those connections leading to other units.
6. Each connection has a signed number called a weight that determines whether an activation that travels along it influences the receiving cell to produce a similar or different activation according the sign of the weight.

###### when you start looking a neural networks, you hit some complex math and difficult algorithms

- I won't go into to specifics -- but they look like this:
- (SHOW Sigma notation)
- but, when you look at it, all it's really doing is summing up a cell's activation and weight and passing it along to another unit to do the same thing (based on more results) until it reaches the output
- so, in this figure, when unit (u13) is reevaluated, its activation is determined by the activations of u3, u8, u9, and u10 and the weights w11,0 , w11,3, w11,8 , w11,9 and w11,10
- the network learns by using several algorithms like back-propagation, by re-adjusting the weights each time it makes a mistake

#### What does this have to do with linguistics?

##### Chomsky

1. We're all aware of Chomsky's assault on behaviorism in the 1950's
2. how he argued that despite their apparent differences, all languages use a similar set of underlying rules so fundamental yet so subtle that children cannot simply acquire them by listening to their parents
3. Chomsky says that we ware genetically predisposed to learn these grammatical rules
4. armed with neural networks, researchers are beginning to probe the assumptions behind Chomsky's theories
5. what they are finding is that his theory, which is the heart of modern linguistics, may be flawed.
   B. Neural Networks can accomplish grammatical tasks without having innate rules
6. these researchers are not trying to recreate brain - impossible with 10^6 neurons
7. but even with relatively small sets of cell-units, show remarkable results
8. I looked at 2 studies
   a. David Rumelhart and James McClelland's findings that a neural network can learn to correctly produce past-tenses of verbs
   b. and another by Lawrence, Giles, and Fong that demonstrated that a neural network can learn to distinguish grammatically correct sentences
   C. Rumelhart/McClelland
9. in the mid-1980's wondered, how might a network, like a child, learn to produce correct forms of pat-tense verbs
10. Chomsky's view assumes the existence of a set of rules we unconsciously apply to the present tense verbs to produce the past tense
11. all regular verbs follow the simple rule that adds the "-ed" suffix to the root of the verb
12. the 180 or so irregulars verbs obey what Chomsky calls 'exception" rules -- go becomes went, was becomes had
13. these exception rules are central to Chomsky's theory -- for without these rules, children would be unable to generate past tenses
14. Rumelhart and McClelland say he's Chomsky's wrong
15. they devised a network that can produce correct past tense forms of both regular and irregular verbs without needing to treat irregular verbs differently
16. their network consisted of 460 input and 460 output units
17. verb roots can be programmed into the input units and via connections, encode the past tense from the output units
18. the network uses a learning algorithm called back-propagation of error which trains the network
19. in training, McClelland and Rumelhart put 420 verbs into the network which encoded the past-tense and then compared its result to what should have been the correct result
20. each time the network makes a mistake, it changes the weights in such a way as to ensure that the next time the input pattern is presented, the output will be closer to being correct

#### They argue that this teaching process mimics the feedback children receive as they attempt to learn the past tense

21. in one test, their network produced the correct past tense forms of 90% of a bacth of 86 unfamiliar regular verbs and was abile also to handle the irregular forms.
22. after training, the network produced 'wept' for 'weep', 'clung' for cling.
    E. Lawrence, et al
23. for sake of time, can't do into the details of their experiment
24. SHOW TABLE!!
25. briefly, they tagged words in sentences with its possible part-of-speech, noun, verb, adjective, etc.
26. they inputted these tags into their network and using a Nearest-Neighbors algorithm tried to assess the grammatical correctness of the sentence
27. the network was trained with a set of correct sentences
28. after training, they showed that with any rules, their network determined whether an unfamiliar sentence was grammatically correct 55% of the time
29. their finding wasn't entirely conclusive, but demonstrated that a neural network is capable of performing the cognitive task without rules

#### What it means for Chomsky's theory and modern lingusitics.

- perhaps there are no rules

- McClelland and Rumelhart showed that

1. The problem for Chomsky's theory is that their network does not use linguistic rules
2. in learning verb forms, its connections are simply weighed according to the correlations it detects between input and output verbs
3. interestingly, the computer model even showed human quirks.
   a. when it was trained with 10 verbs, with 3-4 irregular forms, it went on to produce 'went' from 'go'
   b. but when the training batch was increased to 420, it learning that the greater majority of words still follow the add -ed rule, so it would form 'goed' instead of 'went' even though it had just then performed correctly
   c. McClelland and Rumelhart say this is similar to the counter-intuitive errors children make when they've already shown that they know that 'went' is the past-tense of 'go', but sometimes say goed or wented
4. the debate between Chomsky and researcher using neural networks is just beginning
5. but already, the success of neural networks to produce language without rules are forcing linguists to rethink some of their ideas about how we acquire language
