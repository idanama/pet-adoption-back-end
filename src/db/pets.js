const pets = [
  {
    id: 1,
    type: 'Cat',
    name: 'Nitzi',
    status: 'Adoptable',
    pictures: ['/images/nitzi.jpg'],
    height: '23cm',
    weight: '4.2kg',
    color: 'Golden tabby and white',
    bio: 'Nitzi is two years old. With a mixed furry coat, he loves being pet and to play, always curious. Nitzi needs a family that will give him love and warmth, they will get so much more in return.',
    tagline: 'Purrs',
    hypoallergenic: false,
    diet: 'Regular',
    breed: 'Mixed',
    gender: 'Male',
    dateOfBirth: new Date(2018, 6),
  },
  {
    id: 2,
    type: 'Cat',
    name: 'Loola',
    status: 'Adoptable',
    pictures: ['/images/loola.jpg'],
    height: '21cm',
    weight: '3.6kg',
    color: 'Black',
    bio: 'A mixed breed cat. Naughty and energetic cat that loves to play. Looking for a warm house and a loving family to be part of',
    tagline: 'Hi! I`m new here',
    hypoallergenic: false,
    diet: 'Regular',
    breed: 'Mixed',
    gender: 'Female',
    dateOfBirth: new Date(2020, 7),
  },
  {
    id: 3,
    type: 'Cat',
    name: 'Noya',
    status: 'Adoptable',
    pictures: ['/images/noya.jpg'],
    height: '21cm',
    weight: '3.6kg',
    color: 'Gray tabby',
    bio: 'A gray tabby cat. Noya is special, she doesn\'t always like being on peoples hands and in the air and prefers solid ground. But after she\'ll get used to you she will love to play and have fun. In search for a home with a lot of patience and experience with cats that is willing to invest in this little one, will get a promising return out of.',
    tagline: 'Can\'t touch this :P',
    hypoallergenic: false,
    diet: 'Regular',
    breed: 'Mixed',
    gender: 'Female',
    dateOfBirth: new Date(2020, 8),
  },
  {
    id: 4,
    type: 'Cat',
    name: 'Mari',
    status: 'Adoptable',
    pictures: ['/images/mari.jpg'],
    height: '26cm',
    weight: '4kg',
    color: 'Golden tabby',
    bio: 'Looking for a warm steady house, will get plenty of love for lifetime.',
    tagline: 'Can\'t touch this :P',
    hypoallergenic: false,
    diet: 'Regular',
    breed: 'Mixed',
    gender: 'Female',
    dateOfBirth: new Date(2020, 7),
  },
  {
    id: 5,
    type: 'Cat',
    name: 'Mash',
    status: 'Adoptable',
    pictures: ['/images/mari.jpg'],
    height: '26cm',
    weight: '4kg',
    color: 'Black and White Bicolor',
    bio: 'Are you ready for this? She is OK with dogs! Naughty and gentle, loves to hug and being pet. Playtime is all the time. Looking for a warm and pampering family to live with',
    tagline: 'You can woof, I actually don\'t mind',
    hypoallergenic: false,
    diet: 'Regular',
    breed: 'Mixed',
    gender: 'Female',
    dateOfBirth: new Date(2019, 11),
  },
  {
    id: 6,
    type: 'Cat',
    name: 'Victor',
    status: 'Adoptable',
    pictures: ['/images/victor.jpg'],
    height: '28cm',
    weight: '4.9kg',
    color: 'Tabby',
    bio: 'A beautiful and intelligent cat. Very friendly a loves to be pet. Victor is looking for a warm and stable home for a lifetime.',
    tagline: 'My name is Victor',
    hypoallergenic: false,
    diet: 'Regular',
    breed: 'Mixed',
    gender: 'Male',
    dateOfBirth: new Date(2020, 5),
  },
  {
    id: 7,
    type: 'Cat',
    name: 'Chasy',
    status: 'Adoptable',
    pictures: ['/images/chasy.jpg', '/images/chasy-2.jpg'],
    height: '23cm',
    weight: '4kg',
    color: 'Cinnamon Tabby and White',
    bio: 'A mixed red cat. Loved being pet and also to play. Chasy will enter straight to your heart, and he is looking for the family that will give him warmth and cuddles.',
    tagline: 'I love being pet',
    hypoallergenic: false,
    diet: 'Regular',
    breed: 'Mixed',
    gender: 'Male',
    dateOfBirth: new Date(2020, 5),
  },
  {
    id: 8,
    type: 'Cat',
    name: 'Shemesh',
    status: 'Adoptable',
    pictures: ['/images/shemesh.jpg'],
    height: '18cm',
    weight: '2.3kg',
    color: 'Cream Tabby',
    bio: 'Beautiful and friendly. He is naughty and curious, is willing to invest all hes good energy to the one who chooses to give him a warm and loving home.',
    tagline: 'Don\'t call me ginger',
    hypoallergenic: false,
    diet: 'Regular',
    breed: 'Mixed',
    gender: 'Male',
    dateOfBirth: new Date(2020, 9),
  },
  {
    id: 9,
    type: 'Cat',
    name: 'Pantera',
    status: 'Adoptable',
    pictures: ['/images/pantera.jpg'],
    height: '19cm',
    weight: '2.1kg',
    color: 'Black',
    bio: 'A sweet kitten that enjoys playing and is learning into petting. Looking for a warm and steady house for a lifetime.',
    tagline: 'Black lives matter',
    hypoallergenic: false,
    diet: 'Regular',
    breed: 'Mixed',
    gender: 'Male',
    dateOfBirth: new Date(2020, 9),
  },
  {
    id: 10,
    type: 'Cat',
    name: 'Polia',
    status: 'Adoptable',
    pictures: ['/images/polia.jpg'],
    height: '20cm',
    weight: '2.3kg',
    color: 'Calico',
    bio: 'Sweet and gives in to petting. A young kitten that wants to find a house with a lot of toys and an owner that will always love.',
    tagline: '1, 2, 3',
    hypoallergenic: false,
    diet: 'Regular',
    breed: 'Mixed',
    gender: 'Female',
    dateOfBirth: new Date(2020, 9),
  },
  {
    id: 11,
    type: 'Cat',
    name: 'Dozia',
    status: 'Adoptable',
    pictures: ['/images/dozia.jpg'],
    height: '26cm',
    weight: '3.2kg',
    color: 'Tabby and White',
    bio: 'Cute and friendly. A beautiful kitten, that loves being pet and cuddled, wants to find a hugging and pampering owner.',
    tagline: 'Cuddle please',
    hypoallergenic: false,
    diet: 'Regular',
    breed: 'Mixed',
    gender: 'Female',
    dateOfBirth: new Date(2020, 8),
  },
  {
    id: 11,
    type: 'Cat',
    name: 'Tzila',
    status: 'Adoptable',
    pictures: ['/images/tzila.jpg'],
    height: '25cm',
    weight: '3.4kg',
    color: 'Gray Tabby',
    bio: 'Beautiful and friendly, want to find a warm house and loving owners that will make her feel like a princess.',
    tagline: 'Royal fun',
    hypoallergenic: false,
    diet: 'Regular',
    breed: 'Mixed',
    gender: 'Female',
    dateOfBirth: new Date(2020, 5),
  },
  {
    id: 12,
    type: 'Cat',
    name: 'Coco',
    status: 'Adoptable',
    pictures: ['/images/coco.jpg'],
    height: '23cm',
    weight: '2.8kg',
    color: 'Black and White',
    bio: 'Beautiful, energetic and naughty. An independent cat that gives into petting and doesn\'t like being being taken by the hands. Wants to find a loving ans stable house without kids.',
    tagline: 'Always up for a pet',
    hypoallergenic: false,
    diet: 'Regular',
    breed: 'Mixed',
    gender: 'Male',
    dateOfBirth: new Date(2020, 5),
  },
  {
    id: 13,
    type: 'Cat',
    name: 'Mika',
    status: 'Adoptable',
    pictures: ['/images/mika.jpg'],
    height: '23cm',
    weight: '3kg',
    color: 'Tabby and White',
    bio: 'Sweet and self indulging. A mischief kitten thirsty for love and ready for her life goal - finding a committed owner that will give her a loving stable home.',
    tagline: 'Have some room for me?',
    hypoallergenic: false,
    diet: 'Regular',
    breed: 'Mixed',
    gender: 'Male',
    dateOfBirth: new Date(2020, 5),
  },
  {
    id: 14,
    type: 'Cat',
    name: 'Tara',
    status: 'Adoptable',
    pictures: ['/images/tara.jpg'],
    height: '22cm',
    weight: '3kg',
    color: 'Black and White',
    bio: 'Sweet and full of charm. A friendly kitten, energetic and naughty. Wants to share her life with a charming and giving owner.',
    tagline: 'You\'re sweeter',
    hypoallergenic: false,
    diet: 'Regular',
    breed: 'Mixed',
    gender: 'Female',
    dateOfBirth: new Date(2020, 8),
  },
  {
    id: 15,
    type: 'Cat',
    name: 'Petel',
    status: 'Adoptable',
    pictures: ['/images/petel.jpg', '/images/petel-2.jpg', '/images/petel-3.jpg', '/images/petel-4.jpg', '/images/petel-5.jpg'],
    height: '22cm',
    weight: '3kg',
    color: 'Tabby and White',
    bio: 'Found abandoned with her sister, that did found a house. Needs a caring owner that will play with, pet and always love.',
    tagline: 'One cat, infinite love',
    hypoallergenic: false,
    diet: 'Regular',
    breed: 'Mixed',
    gender: 'Female',
    dateOfBirth: new Date(2020, 8),
  }, {
    id: 16,
    type: 'Cat',
    name: 'Pitzit',
    status: 'Adoptable',
    pictures: ['/images/pitzit.jpg'],
    height: '22cm',
    weight: '3kg',
    color: 'Tabby and White',
    bio: 'A curious and playful kitten. Wants to give all her good vibes to the one that will take her into his loving and warm home.',
    tagline: 'One cat, infinite love',
    hypoallergenic: false,
    diet: 'Regular',
    breed: 'Mixed',
    gender: 'Female',
    dateOfBirth: new Date(2020, 9),
  },
  {
    id: 17,
    type: 'Dog',
    name: 'Sienna',
    status: 'Adoptable',
    pictures: ['/images/sienna.jpg', '/images/sienna-2.jpg'],
    height: '58cm',
    weight: '25kg',
    color: 'Mixed Brown',
    bio: 'Energetic, cute and loves being pet. She handles other dogs with care, but has to be trained, including potty training. Needs an assertive and strong owner, with experience, that will educate her with love.',
    tagline: 'Je suis belge',
    hypoallergenic: false,
    diet: 'Regular',
    breed: 'Mixed Belgian Shepard',
    gender: 'Female',
    dateOfBirth: new Date(2019, 2),
  },
  {
    id: 18,
    type: 'Dog',
    name: 'Eddie',
    status: 'Adoptable',
    pictures: ['/images/eddie.jpg'],
    height: '62cm',
    weight: '32kg',
    color: 'Golden Brown',
    bio: 'A beautiful big dog. Gentle sweet and cautious, but full of love. Partly OK with other dogs. Needs training. Searching for an owner with a lot of patience that will give him assertive and loving education, with be awarded with a new family member!',
    tagline: 'I\'ll be your friend to the end!',
    hypoallergenic: false,
    diet: 'Regular',
    breed: 'Mixed Rhodesian Ridgeback',
    gender: 'Female',
    dateOfBirth: new Date(2020, 2),
  },
  {
    id: 19,
    type: 'Dog',
    name: 'Monica',
    status: 'Adoptable',
    pictures: ['/images/monica.jpg'],
    height: '47cm',
    weight: '16kg',
    color: 'Golden Brown',
    bio: 'A small pup to be medium-large size. Energetic and friendly. Needs training. Looking for dedicated and responsible owner that will give her a warm loving house for life!',
    tagline: 'Don\'t call me puppy',
    hypoallergenic: false,
    diet: 'Regular',
    breed: 'Mixed Canaan',
    gender: 'Female',
    dateOfBirth: new Date(2020, 9),
  },
  {
    id: 20,
    type: 'Dog',
    name: 'Ritz',
    status: 'Adoptable',
    pictures: ['/images/ritz.jpg'],
    height: '62cm',
    weight: '32kg',
    color: 'Mixed Brown',
    bio: 'A strong energetic dog, full of joy. Sometimes OK with other dogs. Must go through training. Not suitable for a family with small children. Looking for assertive and strong owner with a lot of experience with dogs.',
    tagline: 'I\'m here just for a little while',
    hypoallergenic: false,
    diet: 'Regular',
    breed: 'Mixed Belgian Shepard',
    gender: 'Male',
    dateOfBirth: new Date(2020, 4),
  },
  {
    id: 21,
    type: 'Dog',
    name: 'Miri',
    status: 'Adoptable',
    pictures: ['/images/miri.jpg'],
    height: '28cm',
    weight: '4kg',
    color: 'Mixed Brown',
    bio: 'This pup will grow to be big. Energetic, friendly and mischief. In need of training. Looking for a dedicated and responsible owner, that will give her a warm home.',
    tagline: 'You can call me Miriam',
    hypoallergenic: false,
    diet: 'Regular',
    breed: 'Mixed',
    gender: 'Female',
    dateOfBirth: new Date(2020, 9),
  },
  {
    id: 22,
    type: 'Dog',
    name: 'Rachel',
    status: 'Adoptable',
    pictures: ['/images/rachel.jpg'],
    height: '30cm',
    weight: '4.2kg',
    color: 'Mixed Brown',
    bio: 'This pup will grow to be medium-large. Gentle, friendly and mischief. In need for training. Looking for a dedicated and responsible owner that will provide love in a warm house.',
    tagline: 'I love to be hugged',
    hypoallergenic: false,
    diet: 'Regular',
    breed: 'Mixed',
    gender: 'Female',
    dateOfBirth: new Date(2020, 9),
  },
  {
    id: 23,
    type: 'Dog',
    name: 'Ron',
    status: 'Adoptable',
    pictures: ['/images/ron.jpg'],
    height: '30cm',
    weight: '4.2kg',
    color: 'Mixed Brown',
    bio: 'This pup will grow to be a big boy. Energetic, mischief and friendly. Loves to be hugged. In need of training. Looking for a dedicates and responsible family, that will give him a lot of love.',
    tagline: 'I\'m here for you',
    hypoallergenic: false,
    diet: 'Regular',
    breed: 'Mixed',
    gender: 'Male',
    dateOfBirth: new Date(2020, 9),
  },
  {
    id: 24,
    type: 'Dog',
    name: 'Beni',
    status: 'Adoptable',
    pictures: ['/images/beni.jpg'],
    height: '30cm',
    weight: '4.2kg',
    color: 'Mixed Brown',
    bio: 'This pup will grow to be a big boy. Energetic, mischief and friendly. Loves to be hugged. In need of training. Looking for a dedicates and responsible family, that will give him a lot of love.',
    tagline: '',
    hypoallergenic: false,
    diet: 'Regular',
    breed: 'Mixed',
    gender: 'Male',
    dateOfBirth: new Date(2020, 9),
  },
  {
    id: 25,
    type: 'Dog',
    name: 'Lucky',
    status: 'Adoptable',
    pictures: ['/images/lucky.jpg'],
    height: '30cm',
    weight: '4.2kg',
    color: 'Mixed Brown',
    bio: 'A big Canaan dog, friendly and energetic. Lucky is sometimes OK with other dogs. In need of training. Looking for a dedicates and responsible family, that will be able to give him everything a dog needs!',
    tagline: 'Make my name worthwhile',
    hypoallergenic: false,
    diet: 'Regular',
    breed: 'Canaan',
    gender: 'Male',
    dateOfBirth: new Date(2020, 4),
  },
  {
    id: 26,
    type: 'Dog',
    name: 'Geshem',
    status: 'Adoptable',
    pictures: ['/images/geshem.jpg'],
    height: '56cm',
    weight: '12.5kg',
    color: 'Mixed Brown',
    bio: '',
    tagline: '',
    hypoallergenic: false,
    diet: 'Regular',
    breed: 'Mixed',
    gender: 'Male',
    dateOfBirth: new Date(2020, 7),
  },
];

export default pets;