import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import { ChevronLeft, ChevronRight } from "lucide-react";
import apiMovie from "@/services/apiMovie";

const PAGE_SIZE = 3;

const ReviewSection = () => {
  const { id: movieId } = useParams();

  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchReviews = async (pageNumber) => {
    setLoading(true);
    try {
      const res = await apiMovie.getMovieReview(movieId, pageNumber, PAGE_SIZE);

      // MAP ĐÚNG THEO BACKEND
      setReviews(res.data || []);
      setPage(res.pagination?.current_page || pageNumber);
      setTotalPage(res.pagination?.total_pages || 1);
    } catch (error) {
      console.error("Fetch reviews failed:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (movieId) {
      fetchReviews(page);
    }
  }, [movieId, page]);

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Reviews</h2>

      {/* Loading */}
      {loading && (
        <div className="space-y-4">
          {Array.from({ length: PAGE_SIZE }).map((_, i) => (
            <Skeleton key={i} className="h-[120px] w-full" />
          ))}
        </div>
      )}

      {/* Empty */}
      {!loading && reviews.length === 0 && (
        <p className="text-sm text-muted-foreground">No reviews available.</p>
      )}

      {/* List */}
      {!loading && reviews.length > 0 && (
        <div className="space-y-4">
          {reviews.map((r) => (
            <Card key={r.id}>
              <CardContent className="p-5 space-y-2">
                <div className="flex justify-between items-center">
                  <p className="font-semibold">{r.title}</p>
                  <span className="text-sm">{r.rate}/10</span>
                </div>

                <p className="text-xs text-muted-foreground">
                  {r.username} • {new Date(r.date).toLocaleDateString()}
                </p>

                <p className="text-sm leading-relaxed">{r.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Pagination */}
      {!loading && totalPage > 1 && (
        <div className="flex justify-center items-center gap-4 mt-6">
          <Button
            variant="outline"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Previous
          </Button>

          <span className="text-sm">
            Page {page} / {totalPage}
          </span>

          <Button
            variant="outline"
            disabled={page === totalPage}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      )}
    </section>
  );
};

export default ReviewSection;
