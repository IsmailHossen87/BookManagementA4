import HomeCard from "../HomeCard/HomeCard";
import TopFeatures from "../TopAchievement/TopAchivement";
import Banner from "./Banner";

export default function Home() {
  return (
    <div className="space-y-3">
      <Banner/>
    <div className="container mx-auto">
        <HomeCard/>
      <TopFeatures/>
    </div>
    </div>
  )
}

