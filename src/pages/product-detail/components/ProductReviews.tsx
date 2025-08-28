"use client";

import { useState } from "react";
import {
  Star,
  ThumbsUp,
  ThumbsDown,
  Filter,
  ChevronLeft,
  ChevronRight,
  ImageIcon,
} from "lucide-react";
import {
  Badge,
  Button,
  Card,
  List,
  Avatar,
  Progress,
  Divider,
  Image,
  Space,
  Typography,
  Rate,
  Tag,
} from "antd";

const { Text, Title } = Typography;

interface ProductReviewsProps {
  productId: string;
}

export default function ProductReviews({ productId }: ProductReviewsProps) {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [showPhotosOnly, setShowPhotosOnly] = useState(false);

  const ratingBreakdown = [
    { stars: 5, count: 847, percentage: 68 },
    { stars: 4, count: 249, percentage: 20 },
    { stars: 3, count: 87, percentage: 7 },
    { stars: 2, count: 37, percentage: 3 },
    { stars: 1, count: 27, percentage: 2 },
  ];

  const reviews = [
    {
      id: 1,
      user: {
        name: "John D.",
        avatar: "/placeholder.svg?height=40&width=40",
        verified: true,
      },
      rating: 5,
      date: "2024-01-15",
      content:
        "Excellent gamepad! Very responsive and comfortable to use. The build quality is outstanding and it works perfectly with my PC games. Highly recommended!",
      images: [
        "/placeholder.svg?height=80&width=80",
        "/placeholder.svg?height=80&width=80",
      ],
      helpful: 24,
      unhelpful: 2,
      sellerResponse: {
        content:
          "Thank you for your positive feedback! We're glad you're enjoying the gamepad.",
        date: "2024-01-16",
      },
    },
    {
      id: 2,
      user: {
        name: "Sarah M.",
        avatar: "/placeholder.svg?height=40&width=40",
        verified: true,
      },
      rating: 4,
      date: "2024-01-10",
      content:
        "Good quality gamepad, works well for most games. The only minor issue is that the D-pad could be a bit more precise, but overall very satisfied with the purchase.",
      images: [],
      helpful: 18,
      unhelpful: 1,
    },
    {
      id: 3,
      user: {
        name: "Mike R.",
        avatar: "/placeholder.svg?height=40&width=40",
        verified: false,
      },
      rating: 5,
      date: "2024-01-08",
      content:
        "Perfect for gaming! Fast delivery and exactly as described. The wireless connection is stable and battery life is great.",
      images: ["/placeholder.svg?height=80&width=80"],
      helpful: 31,
      unhelpful: 0,
    },
  ];

  const filteredReviews = reviews.filter((review) => {
    if (selectedRating && review.rating !== selectedRating) return false;
    if (showPhotosOnly && review.images.length === 0) return false;
    return true;
  });

  const renderFilters = () => (
    <div className="space-y-4">
      <div>
        <Text className="text-sm font-medium mb-2 block">Rating</Text>
        <Space direction="vertical" className="w-full">
          <Button
            type="link"
            size="small"
            className="w-full text-left py-3"
            onClick={() => setSelectedRating(null)}
          >
            All Ratings
          </Button>
          {[5, 4, 3, 2, 1].map((rating) => (
            <Button
              key={rating}
              type="link"
              size="small"
              className="group w-full text-left py-3"
              onClick={() => setSelectedRating(rating)}
            >
              <Space>
                <Rate disabled defaultValue={rating} className="text-sm" />
                <Text>
                  ({ratingBreakdown.find((r) => r.stars === rating)?.count || 0}
                  )
                </Text>
              </Space>
            </Button>
          ))}
        </Space>
      </div>

      <Divider />

      <div>
        <Button
          type="link"
          size="small"
          className="w-full text-left py-3"
          icon={<ImageIcon className="h-4 w-4" />}
          onClick={() => setShowPhotosOnly(!showPhotosOnly)}
        >
          With Photos Only
        </Button>
      </div>
    </div>
  );

  const renderReviewImages = (images: string[]) => {
    if (images.length === 0) return null;

    return (
      <div className="flex gap-2 mb-4">
        {images.map((image, index) => (
          <Image
            key={index}
            src={image || "/placeholder.svg"}
            alt={`Review image ${index + 1}`}
            width={80}
            height={80}
            className="rounded-lg border cursor-pointer hover:opacity-80"
            preview={{
              mask: (
                <div className="flex items-center justify-center h-full">
                  <ImageIcon className="h-4 w-4 text-white" />
                </div>
              ),
            }}
          />
        ))}
      </div>
    );
  };

  const renderSellerResponse = (sellerResponse: any) => {
    if (!sellerResponse) return null;

    return (
      <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500 mt-4">
        <Space className="mb-2">
          <Tag color="blue">Seller Response</Tag>
          <Text className="text-sm text-gray-500">
            {new Date(sellerResponse.date).toLocaleDateString()}
          </Text>
        </Space>
        <Text className="text-sm text-gray-700">{sellerResponse.content}</Text>
      </div>
    );
  };

  const renderReviewItem = (review: any) => (
    <List.Item className="!p-0">
      <Card className="w-full">
        {/* Review Header */}
        <div className="flex items-start gap-4 mb-4">
          <Avatar src={review.user.avatar || "/placeholder.svg"} size={40}>
            {review.user.name[0]}
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Text strong>{review.user.name}</Text>
              {review.user.verified && (
                <Badge color="green" text="Verified Purchase" />
              )}
            </div>
            <div className="flex items-center gap-3 mb-2">
              <Rate disabled defaultValue={review.rating} className="text-sm" />
              <Text className="text-sm text-gray-500">
                {new Date(review.date).toLocaleDateString()}
              </Text>
            </div>
          </div>
        </div>

        {/* Review Content */}
        <Text className="text-gray-700 mb-4 block leading-relaxed">
          {review.content}
        </Text>

        {/* Review Images */}
        {renderReviewImages(review.images)}

        {/* Helpful Actions */}
        <Space className="mb-4">
          <Button
            type="text"
            size="small"
            icon={<ThumbsUp className="h-4 w-4" />}
            className="text-gray-500"
          >
            Helpful ({review.helpful})
          </Button>
          <Button
            type="text"
            size="small"
            icon={<ThumbsDown className="h-4 w-4" />}
            className="text-gray-500"
          >
            ({review.unhelpful})
          </Button>
        </Space>

        {/* Seller Response */}
        {renderSellerResponse(review.sellerResponse)}
      </Card>
    </List.Item>
  );

  return (
    <div className="min-h-[80vh]">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          {/* Filters */}
          <Card>{renderFilters()}</Card>
        </div>

        {/* Reviews List */}
        <div className="lg:col-span-3">
          <div className="flex items-center justify-between mb-6">
            <Title level={3}>Customer Reviews ({filteredReviews.length})</Title>
          </div>

          <List
            dataSource={filteredReviews}
            renderItem={renderReviewItem}
            className="space-y-6"
          />
        </div>
      </div>
    </div>
  );
}
