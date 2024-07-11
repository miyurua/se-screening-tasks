const src = {
  prop11: {
    prop21: 21,
    prop22: {
      prop31: 31,
      prop32: 32,
    },
  },
  prop12: 12,
};

const proto = {
  prop11: {
    prop22: null,
  },
};

const objectProjection = (src, proto) => {
  let res = {};
  for (let i in proto) {
    if (i in src) {
      //   res[i] = src[i];
      res[i] = {};
      //   console.log(proto[i]);
      //   console.log("i ", i);
      //   console.log("src i", src[i]);

      for (j in src[i]) {
        // console.log("j ", j);
        // console.log("p", proto[i]);

        if (j in proto[i]) {
          //   console.log("true");
          //   console.log("src j ", src[i][j]);
          res[i][j] = src[i][j];
        }
      }
    }
  }
  return res;
};

proj = objectProjection(src, proto);

console.log(proj);
