import { GetServerSideProps, GetStaticProps, NextPage } from "next";
import { useEffect } from "react";
import http from "../../http";
import { Product } from "../../model";
import Link from "next/link";

interface ProductsListPageProps {
  products: Product[];
}
const ProductsListPage: NextPage<ProductsListPageProps> = ({ products }) => {
  //   useEffect(() => {
  //       fetch('http://localhost:3000/products')
  //         .then(res => res.json())
  //         .then(data => console.log(data))
  //   }, []);

  return (
    <div>
      <h3>Listagem de produtos</h3>
      <ul>
        {products.map((product, key) => (
          <li key={key}>
            {product.id} | {product.name} |{" "}
            <Link href="/products/[id]" as={`/products/${product.id}`}>
              <a>Detalhes</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsListPage;

// export const getServerSideProps: GetServerSideProps<ProductsListPageProps> =
//   async (context) => {
//     const { data: products } = await http.get("products");
//     //Stale While Revalidate - SWR Implementando servidores WEB

//     //Statico com dinamico revalidate
//     console.log(products);
//     return {
//       props: {
//         products,
//       },
//     };
//   };

export const getStaticProps: GetStaticProps<ProductsListPageProps> =
  async (context) => {
    const { data: products } = await http.get("products");
    //Stale While Revalidate - SWR Implementando servidores WEB

    //Statico com dinamico revalidate
    console.log(products);
    return {
      props: {
        products,
      },
    };
  };
