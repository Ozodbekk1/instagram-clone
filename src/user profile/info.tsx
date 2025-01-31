import axios from "axios"
import { useState, useEffect } from "react";
import  {User}  from "../interfaces/userProfile";
import VerifiedIcon from '@mui/icons-material/Verified';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import { Skeleton } from "@/components/ui/skeleton"

const Info = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<User | null>(null);
  const [user, setUser] = useState<string>('y777_rich');
  const options = {
    method: 'GET',
    url: 'https://instagram-scraper-api2.p.rapidapi.com/v1/info',
    params: {
      username_or_id_or_url : user
    },
    headers: {
      'x-rapidapi-key': '700f1cf1a8mshf687cabfffd54bap126c1ajsnd71e7c64c5eb',
      'x-rapidapi-host': 'instagram-scraper-api2.p.rapidapi.com'
    }
  };
useEffect(() =>{
  const getData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.request(options);
      setData(response.data.data);
      console.log(response.data);
    } catch (error) {
      console.log('something went wrong', error);
    } finally {
      setIsLoading(false);
    }
  }
  getData()
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [])
  
  return (
    <div>
    <div>
      {
        data ? (
          <div>
            <input type="text" placeholder="Username" value={user} onChange={(e) => setUser(e.target.value)} />
            <h1>Username: {data.username}</h1>
            <h1>Full Name: {data.full_name}</h1>
            <h1>Biography: {data.biography}</h1>
            <h1>Category: {data.category}</h1>
            <h1>Category Id: {data.category_id}</h1>
            <h1>Followers: {data.follower_count}</h1>
            <h1>Following: {data.following_count}</h1>
            <h1>Has Highlight Reels: {data.has_highlight_reels}</h1>
            <h1>Is New To Instagram: {data.is_new_to_instagram ?'New to Instagram' : ''}</h1>
            <h1>Is Private: {data.is_private ? "private" : "public"}</h1>
            <h1>Is Verified: {data.is_verified ? <VerifiedIcon /> : <NewReleasesIcon />}</h1>
            <h1>Is Whatsapp Linked: {data.is_whatsapp_linked ? "Linked to whatsapp" : "Not Linked to whatsapp"}</h1>
          </div>
        ) : (
          <Skeleton className="w-[600px] h-[100px] rounded-full" />

        )
      }
    </div>
    <div>
      <h1>
        Info
      </h1>
      <h1 className="text-2xl text-blue-800">
        {isLoading ? 'Loading...' : 'Data Loaded'}
      </h1>
    </div>
    </div>
  )
}

export default Info
