import * as yup from "yup";
import { MixedSchema } from "yup/lib/mixed";

declare module "yup" {
  export class MixedSchema1 extends MixedSchema {
    fileRequired(): MixedSchema1;
  }
}

yup.addMethod(yup.mixed, "fileRequired", function fileRequired() {
  return this.test((value) => {
    return value && value.length > 0;
  });
});

export default Object;
