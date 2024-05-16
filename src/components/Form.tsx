import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { FC, useRef } from "react";
import { PropagateLoader } from "react-spinners";

interface FormType {
  save: (arg: PhoneType) => void;
  loading: boolean;
}

interface PhoneType {
  name: string | undefined;
  price: number | undefined | string;
  description: string | undefined;
  status: string;
  category_id: string;
}

const Form: FC<FormType> = (props) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const decRef = useRef<HTMLInputElement>(null);

  function handleSave(event: React.MouseEvent) {
    event.preventDefault();

    const phone: PhoneType = {
      name: nameRef.current?.value,
      price: priceRef.current?.value,
      description: decRef.current?.value,
      status: "active",
      category_id: "2",
    };

    props.save(phone);

    if (nameRef.current) {
      nameRef.current.value = "";
    }

    if (priceRef.current) {
      priceRef.current.value = "";
    }

    if (decRef.current) {
      decRef.current.value = "";
    }
  }

  return (
    <div>
      <h1 className="text-center mb-3 text-2xl">Phones</h1>
      <form className="w-2/5 mx-auto mb-10 bg-zinc-100 p-5 rounded-lg">
        <TextField
          className="w-full"
          id="name"
          label="Name"
          variant="outlined"
          inputRef={nameRef}
          sx={{ marginTop: 2 }}
        />
        <TextField
          className="w-full"
          id="price"
          label="Price"
          variant="outlined"
          inputRef={priceRef}
          sx={{ marginTop: 2 }}
        />
        <TextField
          className="w-full mt-4"
          id="description"
          label="Description"
          variant="outlined"
          multiline
          rows={4}
          inputRef={decRef}
          sx={{ marginTop: 2 }}
        />
        <Button
          className="w-full"
          variant="contained"
          sx={{ marginTop: 2 }}
          onClick={handleSave}
          disabled={props.loading ? true : false}
        >
          {props.loading ? (
            <PropagateLoader color="#36d7b7" className="mb-4" />
          ) : (
            "Save"
          )}
        </Button>
      </form>
    </div>
  );
};

export default Form;
