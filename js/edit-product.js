import { cartAmount } from "./ui/cartAmount.js";
import createMenu from "./ui/createMenu.js";

createMenu();
cartAmount();

/* So u need an input in your form with type file.
Than target that input with value.files[0].
Put the input value in your add product function.
Then in your add product function make a new
formData and append your image value like this:
formdata.append("files.image", imageparameter, 
mageparameter.name);
Remove json.stringyfy from your data varibale
which contain your other inputs. Then
formData.append("data", JSON.stringyfy(data)); 
Then put your formData in the body of your request 

Get rid of 'Content-type' : 'application/json'.
Woop woop, works with PUT requests to change just
the image on an existing product. */
