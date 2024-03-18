import FuelProvider from "./FuelProvider";
import { useFuelet } from "hooks/useFuelet";

class FueletProvider extends FuelProvider {
  provider = useFuelet()[0];
}

export default FueletProvider;
