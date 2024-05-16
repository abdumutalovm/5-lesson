import Cards from "../components/Cards";
import Form from "../components/Form";
import { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import SyncLoader from "react-spinners/SyncLoader";

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

interface BeingDeleteType {
  id: string;
  beingDeleted: boolean;
}

interface PhoneTypeCreate {
  name: string | undefined;
  price: number | undefined | string;
  description: string | undefined;
  status: string;
  category_id: string;
}

function Home() {
  const [data, setData] = useState<PhoneType[]>([]);
  const [beingDeleted, setBeingDeleted] = useState<BeingDeleteType>({
    id: "n",
    beingDeleted: false,
  });
  const [showAlert, setShowAlert] = useState(false);
  const [showAlert2, setShowAlert2] = useState(false);
  const [createLoading, setCreateLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  async function getData(url: string) {
    const resp = await fetch(url);
    const d = await resp.json();
    setData(d);
    setLoading(false);
  }

  useEffect(() => {
    getData("https://auth-rg69.onrender.com/api/products/all");
  }, []);

  function deleteItem(id: string) {
    setBeingDeleted({ id: id, beingDeleted: true });
    if (id) {
      fetch(`https://auth-rg69.onrender.com/api/products/${id}`, {
        method: "DELETE",
      }).then((res) =>
        res
          .json()
          .then((d) => {
            if (d.message == "Mahsulot muvaffaqiyatli o'chirildi") {
              let copied = JSON.parse(JSON.stringify(data));

              copied = copied.filter((el: PhoneType) => {
                return el.id != id;
              });

              setData(copied);
              setShowAlert(true);
              setTimeout(() => setShowAlert(false), 3000);
            }
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            setBeingDeleted({ id: id, beingDeleted: false });
          })
      );
    }
  }

  function handleSave(phone: PhoneTypeCreate) {
    phone.status = "active";
    phone.category_id = "2";
    setCreateLoading(true);
    fetch("https://auth-rg69.onrender.com/api/products/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(phone),
    })
      .then((res) => res.json())
      .then((d) => {
        if (d.id) {
          setData([...data, d]);
          setShowAlert2(true);
          setTimeout(() => setShowAlert2(false), 3000);
        }
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setCreateLoading(false);
      });
  }

  return (
    <div>
      <div className="container max-w-screen-xl mx-auto mt-10 mb-10">
        {showAlert && (
          <Alert variant="outlined" severity="success">
            Mahsulot muvaffaqiyatli o'chirildi
          </Alert>
        )}
        {showAlert2 && (
          <Alert variant="outlined" severity="success">
            Mahsulot muvaffaqiyatli qo'shildi
          </Alert>
        )}
        <Form loading={createLoading} save={handleSave}></Form>

        {loading ? (
          <div className="flex items-center justify-center">
            <SyncLoader color="#36d7b7" />
          </div>
        ) : (
          <div className="card-wrapper flex items-center gap-3 justify-center bg-zinc-100 p-4 rounded-xl flex-wrap">
            {data.length &&
              data.map((phone, index) => {
                return (
                  <Cards
                    beingDelete={beingDeleted}
                    deleteItem={deleteItem}
                    key={index}
                    data={phone}
                  ></Cards>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
