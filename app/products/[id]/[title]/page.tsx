import {
  Card,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";
import { redirect } from "next/navigation";
import "./Product.scss";

interface ProductProps {
  params: {
    id: string;
    title: string;
  };
}

const getData = async (id: string): Promise<Product> => {
  const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
    next: { revalidate: 3600 },
  });
  return response.json();
};

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

const Product = async ({ params }: ProductProps) => {
  const product = await getData(params.id);
  let newText: string = product.title
  .replace(/[^a-zA-Z0-9]/g, "")
  .replace(/\s+/g, "")
  .replace(/&/g, "and");

  
  if (newText !== params.title) {
    redirect(`/products/${params.id}/${newText}`);
  } else {
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
  }
};

export default Product;
