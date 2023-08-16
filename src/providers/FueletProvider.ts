import FuelProvider from "./FuelProvider";

class FueletProvider extends FuelProvider {
  provider = <Window["fuelet"]>window.fuelet;
}

export default FueletProvider;
