import { PlayIcon } from "@/components/shared/icons/play-icon";

export const PlayButton = () => {
  return (
    <div className="absolute inset-0 m-auto flex items-center justify-center w-fit h-fit">
      {/* Ripple ping ring */}
      <span className="absolute inline-flex size-[60px] rounded-full bg-white/30 animate-ping" />
      <figure
        className="relative flex items-center justify-center outline-1 outline-primary-stroke
        aspect-square size-[49px] bg-surface-background rounded-full overflow-hidden
        animate-[play-pulse_2s_ease-in-out_infinite]"
      >
        <PlayIcon size={20} className="text-accent-solid translate-x-[-1px]" />
      </figure>
    </div>
  );
};
