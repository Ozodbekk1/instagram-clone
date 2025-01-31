// import { Url } from "url"

export type User = {
  username: string
  biography: string,
  category: string
  category_id: number
  contact_phone_number: number
  follower_count: number
  following_count: number
  full_name: string
  has_anonymous_profile_picture: boolean
  has_highlight_reels: number
  profile_pic_url : string // this maybe also string
  id: string
  is_new_to_instagram: boolean
  is_potential_business: boolean
  is_private: boolean
  is_verified: boolean
  is_whatsapp_linked: boolean
  latest_reel_media: number
  media_count: number
  show_account_transparency_details: boolean
}

// export interface HdProfilePicUrlInfo {

//   url: string;

//   // other properties

// }
