import axios from "axios";
import { useState, useEffect } from "react";
import { User } from "../interfaces/userProfile";
import VerifiedIcon from "@mui/icons-material/Verified";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import { Stack } from "@chakra-ui/react";
import { Skeleton, SkeletonCircle } from "@/components/ui/skeleton";
import { HStack } from "@chakra-ui/react";
import { Input } from "../components/ui";

const Info = (): JSX.Element => {
  const [data, setData] = useState<User | null>(null);
  const [searchUser, setSearchUser] = useState<string>("occoffm");
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    if (!searchUser) return;
    const getData = async () => {
      setLoading(true);
      try {
        const response = await axios.request({
          method: "GET",
          url: "https://instagram-scraper-api2.p.rapidapi.com/v1/info",
          params: { username_or_id_or_url: searchUser },
          headers: {
            "x-rapidapi-key":
              "700f1cf1a8mshf687cabfffd54bap126c1ajsnd71e7c64c5eb",
            "x-rapidapi-host": "instagram-scraper-api2.p.rapidapi.com",
          },
        });
        setData(response.data.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
        // alert("Something went wrong: " + error);
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    const delayFetch = setTimeout(getData, 1000);
    return () => clearTimeout(delayFetch);
  }, [searchUser]);

  return (
    <div className="background">
      <Input
        placeholder="Search User"
        type="text"
        onChange={(e) => setSearchUser(e.target.value)}
        value={searchUser}
        className=" bg-black outline-none w-96 mx-auto my-4 p-3 rounded-md text-white"
      />
      <div>
        {loading ? (
          <HStack gap="5">
            <SkeletonCircle size="12" />
            <Stack flex="1">
              <Skeleton height="5" />
              <Skeleton height="5" width="80%" />
            </Stack>
          </HStack>
        ) : data ? (
          <div className="flex flex-col  justify-items-start text-center">
            <h1 className="text-2xl my-3">
              {data.username}{" "}
              {data.is_verified ? <VerifiedIcon /> : <NewReleasesIcon />}
            </h1>
            <div className="flex flex-row my-4 mx-4 text-center justify-center gap-3">
              <h1>Posts {data.media_count}</h1>
              <h1>Followers {data.follower_count}</h1>
              <h1>Following {data.following_count}</h1>
            </div>
            <h1>{data.full_name}</h1>
            <h1>{data.biography}</h1>
            <h1>{data.category}</h1>
            <h1> {data.category_id}</h1>
            <h1>{data.has_highlight_reels}</h1>
            <h1>{data.is_new_to_instagram ? "New to Instagram" : ""}</h1>
            <h1>{data.is_private ? "Private" : ""}</h1>
            <h1> </h1>
            <h1>
              {data.is_whatsapp_linked
                ? "Linked to whatsapp"
                : "Not Linked to whatsapp"}
            </h1>
          </div>
        ) : (
          <p>No data available</p>
        )}
      </div>
    </div>
  );
};

export default Info;
