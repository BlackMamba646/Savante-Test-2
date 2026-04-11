import Markdown, { Options } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeUnwrapImages from 'rehype-unwrap-images'
import Link from "next/link";
import { ImageLoader } from "../common/skeleton/ImageLoader";

type Props = {
  API: string;
  content: string;
};

export function MarkdownToJsx({
  API = "",
  content = "",
  ...props
}: Partial<Props & Options>) {
  return (
    <>
      <Markdown
        key={content}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeUnwrapImages]}
        skipHtml={false}
        children={content}
        components={{
          img: ({ src, className, ...props }) => (
            <div className='relative flex h-[360px] w-full mb-5 items-center justify-center overflow-hidden bg-default-200 laptop:h-[440px]'>
              <ImageLoader />
              <img
                src={API + src}
                className='absolute left-0 top-0 z-10 aspect-square h-full w-full object-cover'
                {...props}
                loading='lazy'
              />
            </div>
          ),
          a: ({ children, title, href = "/" }) => (
            <Link
              title={title}
              href={href}
              className='inline-block'
              target='_blank'
              rel='noopener noreferrer'
            >
              {children}
            </Link>
          ),
        }}
        {...props}
      />
    </>
  );
}

MarkdownToJsx.displayName = "MarkdownToJsx";

export default MarkdownToJsx;