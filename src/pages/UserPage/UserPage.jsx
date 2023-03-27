import { useParams } from "react-router-dom";

export default function UserPage({collections}){
    let {userName} = useParams();
    let user = users.find((u) => u.name === userName )

    return(
        <h1>User Detaail</h1>
    );
}