import styled from "@emotion/styled";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Skeleton,
  Typography,
} from "@mui/material";
import { memo } from "react";

const SearchListCardActionArea = styled(CardActionArea)`
  display: flex;
  align-items: stretch;
  flex-direction: column;
  height: 100%;
`;

const formatAddress = ({ address1, city, state, postalCode, address2 } = {}) =>
  [address1, city, state, postalCode, address2].filter(Boolean).join(", ");

export const SearchItem = memo((props) => {
  const {
    id,
    starred,
    image,
    name,
    description,
    address,
    isLoading,
    handleOnClick,
  } = props;

  return (
    <Card component="article">
      <SearchListCardActionArea
        disabled={isLoading}
        onClick={() => handleOnClick({ id, starred: !starred })}
      >
        {image ? (
          <CardMedia
            component="img"
            width="362"
            height="194"
            image={image}
            alt={name}
          />
        ) : (
          <Skeleton variant="rectangular" width="100%" height={194} />
        )}
        <CardContent sx={{ px: 4 }}>
          <Typography gutterBottom variant="h5" component="h3" fontWeight={600}>
            {isLoading ? <Skeleton /> : name}
          </Typography>

          <Typography variant="body2">
            {isLoading ? <Skeleton /> : description}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            gutterBottom
            py={2}
          >
            {isLoading ? <Skeleton /> : formatAddress(address)}
          </Typography>
        </CardContent>
        <CardActions sx={{ px: 4, mt: "auto", pb: 2 }}>
          {starred ? (
            <FavoriteIcon color="primary" />
          ) : (
            <FavoriteIcon color="disabled" />
          )}
        </CardActions>
      </SearchListCardActionArea>
    </Card>
  );
});
