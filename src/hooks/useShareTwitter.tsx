import { openInNewTab } from "../utils";

const TwitterShareUrl = "https://twitter.com/intent/tweet?text=";

export const useShareTwitter = ({ userId }: { userId?: any }) => {
  const pageLink = window.location.href;

  return {
    shareCollection: (collectionName: string) => {
      openInNewTab(`${TwitterShareUrl}${encodeURIComponent(`Check out ${collectionName} collection on @ThunderbyFuel ⚡️⛽️ ${pageLink}`)}`);
    },
    shareProfile: (profileName: string) => {
      openInNewTab(`${TwitterShareUrl}${encodeURIComponent(`Check out ${profileName}'s profile on @ThunderbyFuel ⚡️⛽️ ${window.location.origin}/${userId}`)}`);
    },
    shareNft: (nftName: string, collectionName: string) => {
      openInNewTab(`${TwitterShareUrl}${encodeURIComponent(`Check out ${nftName} from ${collectionName} collection on @ThunderbyFuel ⚡️⛽️ ${pageLink}`)}`);
    },
  };
};
