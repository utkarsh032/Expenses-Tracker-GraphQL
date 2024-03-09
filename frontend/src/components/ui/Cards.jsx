import Card from "./Card";

const Cards = () => {
  return (
    <div className='w-full  min-h-[40vh]'>
      <h1 className='md:text-4xl p-4 text-2xl lg:text-4xl font-bold text-center  bg-gradient-to-r from-pink-600 via-indigo-500 to-pink-400  text-transparent bg-clip-text m-5'>History</h1>
      <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-start'>
        <Card cardType={"saving"} />
        <Card cardType={"expense"} />
        <Card cardType={"investment"} />
      </div>
    </div>
  );
};
export default Cards;