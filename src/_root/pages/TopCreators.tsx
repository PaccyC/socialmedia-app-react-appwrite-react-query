import GridTopCreatorsList from "../../components/ui/shared/GridTopCreators"


const TopCreators = () => {
  return (
    <div className=" hidden md:flex flex-col min-w-[465px]  py-10 px-6 bg-dark-2">
     
        <h2 className=" h2-bold mb-7">Top Creators</h2>
        <GridTopCreatorsList/>
    </div>

    
  )
}

export default TopCreators