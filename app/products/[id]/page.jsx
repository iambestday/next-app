import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import Rating from '@mui/material/Rating';
import "./Product.scss"; 

const getData = async (id) => {
  const data = await fetch(`https://fakestoreapi.com/products/${id}`, {
    next: { revalidate: 3600 },
  });
  console.log(id);
  return data.json();
};

const Product = async ({params}) => {
  const product = await getData(params.id);
  console.log(product)
  return (
    <div className="centered-card">
      <Card className="custom-card"> 
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
          <Typography gutterBottom variant="h5" component="div">
            {product.category}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.description}
          </Typography>
          <Typography variant="h6" color="text.primary">
            ${product.price}
          </Typography>
          <div className="rating-container">
            <Rating name="read-only" value={product.rating.rate} readOnly />
            <Typography variant="body2" color="text.secondary">
              {product.rating.count} : count of rate
            </Typography>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Product;
