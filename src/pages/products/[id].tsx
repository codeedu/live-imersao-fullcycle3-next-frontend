import {
  GetServerSideProps,
  GetStaticPaths,
  GetStaticProps,
  NextPage,
} from "next";
import { useRouter } from "next/dist/client/router";
import http from "../../http";
import { Product } from "../../model";

interface ProductDetailPageProps {
  product: Product;
}
const ProductDetailPage: NextPage<ProductDetailPageProps> = ({ product }) => {
  const router = useRouter()
  
  if(router.isFallback){
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <h3>Produto - {product.name}</h3>
      <ul>
        <li>
          {product.id} | {product.price}
        </li>
      </ul>
    </div>
  );
};

export default ProductDetailPage;

// export const getServerSideProps: GetServerSideProps<
//   ProductDetailPageProps,
//   { id: string }
// > = async (context) => {
//   const { id } = context.params!; //Assertion Null
//   const { data: product } = await http.get(`products/${id}`);

//   console.log(product);
//   return {
//     props: {
//       product,
//     },
//   };
// };

export const getStaticProps: GetStaticProps<
  ProductDetailPageProps,
  { id: string }
> = async (context) => {
  const { id } = context.params!; //Assertion Null
  const { data: product } = await http.get(`products/${id}`);

  console.log(product);
  return {
    props: {
      product,
    },
    revalidate: 10 
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data: products } = await http.get(`products`);

  console.log(products);
  console.log(products.map((product: Product) => ({
    params: { id: product.id },
  })));
  return {
    paths: products.map((product: Product) => ({
      params: { id: product.id+"" },
    })),
    fallback: 'blocking'
  };
};
