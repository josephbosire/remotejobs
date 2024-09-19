export type JobItem = {
  id: number;
  title: string;
  badgeLetters: string;
  company: string;
  relevanceScore: number;
  daysAgo: number;
  date: string;
};

export type JobItemExpanded = JobItem & {
  description: string;
  qualifications: string[];
  reviews: string[];
  duration: string;
  salary: string;
  coverImgURL: string;
  companyURL: string;
  location: string;
};

export type JobItemResponse = {
  public: boolean;
  jobItem: JobItemExpanded;
};

export type JobItemsResponse = {
  public: boolean;
  sorted: boolean;
  jobItems: Array<JobItem>;
};

export type TDirection = "next" | "previous";

export type TSortType = "relevant" | "recent";
