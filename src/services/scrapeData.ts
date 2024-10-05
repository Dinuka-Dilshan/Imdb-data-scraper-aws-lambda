import parser from "./parser";

export default async (endpoint: string) => {
  try {
    const response = await fetch(endpoint);
    const htmlText = await response.text();

    const t1 = performance.now();
    const data = parser(htmlText);
    const t2 = performance.now();

    console.log(`consumed ${Math.round(t2 - t1)}ms for parsing ${endpoint}`);

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
};
