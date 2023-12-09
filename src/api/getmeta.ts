import dispatch from "../utils/dispatch";

interface Tag {
    name: string;
    desc: string;
    link: string;
}

interface Status {
    url:  string;
    text: string;
}

export type GET = {
    name:         string;
    characters:   Status[];
    cover:        string;
    tags:         Tag[];
    translators:  Status[];
    authors:      Status[];
    uploader:     string;
    status:       Status;
    description:  string;
    last_updated: number;
    likes:        number;
    dislikes:     number;
};

export async function invoke(id: string) {
  return await dispatch<GET, any>(
    `/get-metadata/${encodeURIComponent(id)}`
    // (data) => Object.values(data)[0] as GET
  );
}
