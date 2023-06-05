import { Cookies } from "react-cookie";
import { getAccessToken } from "./tokens/getAccessToken";
import { redirectToAuthCodeFlow } from "./redirectFlow";
import store from "../redux/store";
import { setLogOut } from "../redux/actions/actions";

export async function fetchData(){
    const cookies = new Cookies()
    
    const clientId = "cf304debd56947f181794e3a88c29e9d";
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (!code) {
        redirectToAuthCodeFlow(clientId);
    } else {
        if(!cookies.get('access_token')){
            store.dispatch(setLogOut())
            getAccessToken(clientId, code);
        }
    }
}

