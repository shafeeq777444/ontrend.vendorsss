export const transliterateINTOarabic = async (value) => {
  console.log(value,"value")

  if (!value) return "";

  try {
    const response = await fetch(
      `https://inputtools.google.com/request?text=${value}&itc=ar-t-i0-und&num=1&cp=0&cs=1&ie=utf-8&oe=utf-8`,
      {
        method: "GET"
      }
    );

    const result = await response.json();

    if (result[0] === "SUCCESS") {
      const suggestions = result[1][0][1];
      return suggestions[0] || "" ;
    } else {
      return "";
    }
  } catch (err) {
    console.error(err);
  }
};