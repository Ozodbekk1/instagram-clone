import axios from "axios";
import { useState, useEffect } from "react";
import { User } from "../interfaces/userProfile";
import VerifiedIcon from "@mui/icons-material/Verified";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import { HStack, Stack } from "@chakra-ui/react"
import { Skeleton, SkeletonCircle } from "@/components/ui/skeleton"

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
      } catch (error) {
        console.error("Something went wrong", error);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    const delayFetch = setTimeout(getData, 1000);

    return () => clearTimeout(delayFetch);
  }, [searchUser]);

  return (
    <div>
      <input
        type="text"
        placeholder="Enter Instagram Username"
        onChange={(e) => setSearchUser(e.target.value)}
        value={searchUser}
        className="border p-2 rounded-md"
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
          <div>
            <h1>Username: {data.username}</h1>
            <h1>Full Name: {data.full_name}</h1>
            <h1>Biography: {data.biography}</h1>
            <h1>Category: {data.category}</h1>
            <h1>Category Id: {data.category_id}</h1>
            <h1>Followers: {data.follower_count}</h1>
            <h1>Following: {data.following_count}</h1>
            <h1>Has Highlight Reels: {data.has_highlight_reels}</h1>
            <h1>
              Is New To Instagram:{" "}
              {data.is_new_to_instagram ? "New to Instagram" : ""}
            </h1>
            <h1>Is Private: {data.is_private ? "private" : "public"}</h1>
            <h1>
              Is Verified:{" "}
              {data.is_verified ? <VerifiedIcon /> : <NewReleasesIcon />}
            </h1>
            <h1>
              Is Whatsapp Linked:{" "}
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
