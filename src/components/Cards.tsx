import { FC } from "react";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { PuffLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

interface CardType {
  data: {
    id: string;
    name: string;
    description: string;
    price: number;
    status: string;
    category_id: string;
    createdAt: string;
    updatedAt: string;
  };
  deleteItem: (arg: string) => void;
  beingDelete: {
    id: string;
    beingDeleted: boolean;
  };
}
const Cards: FC<CardType> = (props) => {
  const navigate = useNavigate();
  function hanldeDelete() {
    let isDelete = confirm("Are you sure you want to delete?");
    if (isDelete) {
      props.deleteItem(props.data.id);
    }
  }

  function handleRedirect() {
    navigate(`details/${props.data.id}`);
  }
  return (
    <div>
      <CardActionArea className="rounded-xl cursor-pointer">
        <CardContent
          onClick={handleRedirect}
          className="w-[400px] h-[235px] shadow-md rounded-xl"
        >
          <Typography gutterBottom variant="h4" component="div">
            {props.data.name}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            ${props.data.price}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            {props.data.status}
          </Typography>
          <Typography variant="body2" color="text.secondary" marginBottom={1}>
            {props.data.description}
          </Typography>
          <div className="flex items-center gap-4">
            {!(
              props.beingDelete?.beingDeleted &&
              props.beingDelete?.id == props.data?.id
            ) ? (
              <span
                onClick={hanldeDelete}
                className="transition p-2 hover:bg-zinc-300 rounded-full"
              >
                <DeleteIcon className="text-red-500"></DeleteIcon>
              </span>
            ) : (
              <span
                onClick={hanldeDelete}
                className=" transition p-2 hover:bg-zinc-300 rounded-full"
              >
                <PuffLoader color="#36d7b7" size={25} />
              </span>
            )}
            <span className="transition p-2 hover:bg-zinc-300 rounded-full">
              <EditIcon className="text-blue-500"></EditIcon>
            </span>
          </div>
        </CardContent>
      </CardActionArea>
    </div>
  );
};

export default Cards;
