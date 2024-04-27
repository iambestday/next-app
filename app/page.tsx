import Image from "next/image";
import { Grid, Card, CardContent, CardMedia, Typography } from "@mui/material";
import Link from "next/link";

const getData = async () => {
  const data = await fetch("https://fakestoreapi.com/products", {
    next: { revalidate: 3600 },
  });
  return data.json();
};

const Home = async () => {
  const products = await getData();

  return (
    <div>
      <Grid container spacing={3}>
        {products.map((product: any,index:number) => (
          <Grid item key={product.id} xs={12} sm={6} md={3}>
            <Link
            href={`/products/${product.id}`}
            key={index}
            >
            <Card >
              <CardMedia
                component="img"
                height="200"
                image={product.image}
                alt={product.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {product.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.description}
                </Typography>
                <Typography variant="h6" color="text.primary">
                  ${product.price}
                </Typography>
              </CardContent>
            </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Home;
