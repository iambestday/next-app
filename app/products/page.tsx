import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
} from "@mui/material";
import Link from "next/link";

const getData = async () => {
  const data = await fetch("https://fakestoreapi.com/products", {
    next: { revalidate: 3600 },
  });
  return data.json();
};

const Products = async () => {
  const products = await getData();

  return (
    <>
      <Grid container spacing={3} style={{ maxWidth: "1200px" }}>
        {products.map((product: any, index: number) => (
          <Grid item key={product.id} xs={12} sm={6} md={3}>
         
              <Card style={{ height: "100%" }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={product.image}
                  alt={product.title}
                />
                <CardContent>
  

                <Link
    href={`products/${product.id}/${product.title
        .replace(/[^a-zA-Z0-9]/g, "")
        .replace(/\s+/g, "")
        .replace(/&/g, "and")}`}
    key={index}
>
                  <Typography gutterBottom variant="h5" component="div">
                    {product.title}
                  </Typography>
                  </Link>
                  <Typography variant="body2" color="text.secondary">
                    {product.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  
                  <Typography variant="h6" color="text.primary">
                    ${product.price}
                  </Typography>
                </CardActions>
              </Card>
           
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Products;
