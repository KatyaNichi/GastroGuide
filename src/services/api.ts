// api.ts
// export const fetchData = async <T>(endpoint: string): Promise<T> => {
//   const serverUrl = 'http://localhost:4444'; 
//   try {
//     const response = await fetch(`${serverUrl}/${endpoint}`);
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     const data: T = await response.json();
//     return data;
//   } catch (error) {
//     if (error instanceof Error) {
//       throw new Error(`Error: ${error.message}`);
//     } else {
//       throw new Error('An unknown error occurred');
//     }
//   }
// };




export const getBaseUrl=  ( url: string) => {
  return '/srv'+url
}

