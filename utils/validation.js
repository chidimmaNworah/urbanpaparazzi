export const validateEmail = (email) => {
  const regextSt =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regextSt.test(email);
};

export const validateCreateProduct = (product, image) => {
  const checks = [
    {
      msg: "Name, Description, Brand added successfully.",
      type: "success",
    },
  ];
  if (image.length < 1) {
    checks.push({
      // msg: `Choose atleast 1 image (${3 - images.length} remaining).`,
      msg: `Choose atleast 1 image.`,
      type: "error",
    });
  } else {
    checks.push({
      msg: `${images.length} images choosen.`,
      type: "success",
    });
  }
  var s_test = checks.find((c) => c.type == "error");
  if (s_test) {
    return checks;
  } else {
    return "valid";
  }
};
