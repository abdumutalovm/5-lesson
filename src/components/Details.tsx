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

  return (
    <div className="w-3/5 p-10 rounded-xl mx-auto bg-zinc-400 text-white gap-4 mt-10 flex flex-col items-center">
      <h1 className="text-4xl mb-10 text-zinc-500">About Phone</h1>
      <h1 className="text-3xl font-bold">Name: {phone?.name}</h1>
      <h2 className="text-3xl font-bold">Price: ${phone?.price}</h2>
      <h2 className="text-3xl font-bold">Description: {phone?.description}</h2>
      <h2 className="text-3xl font-bold">Status: {phone?.status}</h2>
      <h2 className="text-3xl font-bold">Category id: {phone?.category_id}</h2>
      <h3 className="text-3xl font-bold">Created at: {phone?.createdAt}</h3>
    </div>
  );
}

export default Details;
