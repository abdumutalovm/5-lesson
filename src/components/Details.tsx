import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface PhoneType {
  id: string;
  name: string;
  description: string;
  price: number;
  status: string;
  category_id: string;
  createdAt: string;
  updatedAt: string;
}

function Details() {
  const params = useParams();
  const navigate = useNavigate();
  const [phone, setPhone] = useState<PhoneType>();

  useEffect(() => {
    if (params.id) {
      fetch(`https://auth-rg69.onrender.com/api/products/${params.id}`).then(
        (res) =>
          res
            .json()
            .then((data) => {
              setPhone(data);
            })
            .catch((err) => {
              console.log(err);
            })
      );
    } else {
      navigate("/home");
    }
  }, []);

  return <div></div>;
}

export default Details;
