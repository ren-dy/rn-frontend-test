import axios from 'axios';

const PRODUCTS = [
  {
    id: 1,
    title: 'Product 1',
    price: 11000,
    image: require('../assets/products/c-d-x-PDX_a_82obo-unsplash.jpg'),
    subDesc: 'Product 1 sub description.',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    rating: 4.6,
    createdAt: '2023-02-25T10:00:00.000Z',
    reviewCount: 31,
  },
  {
    id: 2,
    title: 'Product 2',
    price: 12000,
    image: require('../assets/products/revolt-164_6wVEHfI-unsplash.jpg'),
    subDesc: 'Product 2 sub description.',
    desc: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.',
    rating: 3.3,
    createdAt: '2023-01-01T10:00:00.000Z',
    reviewCount: 4,
  },
  {
    id: 3,
    title: 'Product 3',
    price: 13000,
    image: require('../assets/products/trendest-studio-XZ3EmAIWuz0-unsplash.jpg'),
    subDesc: 'Product 3 sub description.',
    desc: 'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
    rating: 3.8,
    createdAt: '2023-02-21T10:00:00.000Z',
    reviewCount: 24,
  },
  {
    id: 4,
    title: 'Product 4',
    price: 14000,
    image: require('../assets/products/pmv-chamara-1HM2H47xB9Y-unsplash.jpg'),
    subDesc: 'Product 4 sub description.',
    desc: 'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure.',
    rating: 0,
    createdAt: '2023-04-16T10:00:00.000Z',
    reviewCount: 0,
  },
  {
    id: 5,
    title: 'Product 5',
    price: 15000,
    image: require('../assets/products/laura-chouette-_ODRA1MPL1I-unsplash.jpg'),
    subDesc: 'Product 5 sub description.',
    desc: 'To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?',
    rating: 4.9,
    createdAt: '2022-09-30T10:00:00.000Z',
    reviewCount: 97,
  },
  {
    id: 6,
    title: 'Product 6',
    price: 16000,
    image: require('../assets/products/pmv-chamara-MEsWk-dZzlI-unsplash.jpg'),
    subDesc: 'Product 6 sub description.',
    desc: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.',
    rating: 4.2,
    createdAt: '2022-01-11T10:00:00.000Z',
    reviewCount: 174,
  },
  {
    id: 7,
    title: 'Product 7',
    price: 17000,
    image: require('../assets/products/pmv-chamara-x7rsBKIyzvs-unsplash.jpg'),
    subDesc: 'Product 7 sub description.',
    desc: 'Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.',
    rating: 3.1,
    createdAt: '2021-07-01T10:00:00.000Z',
    reviewCount: 201,
  },
];

export async function getProducts(limit = 5) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return PRODUCTS.filter((p, id) => id < limit);
}

export async function getProduct(id) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return PRODUCTS.find((product) => (product.id == id));
}

export async function getReviews(id, limit = 5) {
  let product = PRODUCTS.find((product) => (product.id == id));

  try {
    let l = product.reviewCount > limit ? limit : product.reviewCount;

    let reviews = await axios.get(`https://jsonplaceholder.typicode.com/comments?_limit=${l}`)

    return reviews;
  } catch (error) {
    throw error;
  }
}
