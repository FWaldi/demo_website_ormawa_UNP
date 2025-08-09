import { Button } from "@/components/ui/button";

export function Pagination() {
  return (
    <div className="flex justify-center items-center space-x-2 mt-8">
      <Button variant="outline" size="sm">Previous</Button>
      <Button variant="default" size="sm">1</Button>
      <Button variant="outline" size="sm">2</Button>
      <Button variant="outline" size="sm">3</Button>
      <Button variant="outline" size="sm">Next</Button>
    </div>
  );
}