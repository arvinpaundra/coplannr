import { Icon } from '@iconify/react';
import { useState } from 'react';
import { Sidebar } from '@/components/organisms/Sidebar';
import { PageFooter } from '@/components/organisms/PageFooter';
import { BackgroundGrid } from '@/components/atoms/BackgroundGrid';
import { Header } from '@/components/organisms/Header';
import { Button } from '@/components/ui/Button';
import { PlatformSelector } from '@/components/organisms/PlatformSelector';
import { ContentEditor } from '@/components/organisms/ContentEditor';
import { SchedulePicker } from '@/components/organisms/SchedulePicker';
import { MediaUploader } from '@/components/organisms/MediaUploader';
import { usePlatforms } from '@/hooks/usePlatforms';

export const ComposePage = () => {
  const [isScheduled, setIsScheduled] = useState(true);
  const [content, setContent] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [settings, setSettings] = useState({
    shortenLinks: true,
    autoRetweet: false,
    addFirstComment: true,
  });
  const [scheduleDate, setScheduleDate] = useState({
    day: '24',
    month: 'OCT',
    year: '2024',
    hour: '09',
    minute: '30',
    period: 'PM' as 'AM' | 'PM',
  });
  const [internalTags, setInternalTags] = useState('');

  const {
    data: platforms = [],
    isLoading: isLoadingPlatforms,
    error: platformsError,
  } = usePlatforms();

  const togglePlatform = (platformId: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platformId)
        ? prev.filter((id) => id !== platformId)
        : [...prev, platformId]
    );
  };

  const handleFileUpload = (files: File[]) => {
    setMediaFiles([...mediaFiles, ...files]);
  };

  const removeFile = (index: number) => {
    setMediaFiles(mediaFiles.filter((_, i) => i !== index));
  };

  return (
    <div className="flex h-screen w-screen">
      <Sidebar />

      <main className="flex-1 flex flex-col h-full overflow-hidden bg-[#f8f8f8] relative">
        <BackgroundGrid opacity={0.2} size={20} />

        {/* Header */}
        <Header title="COMPOSE" />

        {/* Scrollable Form Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 z-10">
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Header Section */}
            <div className="relative">
              <div className="border-b-2 border-black pb-6">
                <h1 className="text-4xl font-bold uppercase tracking-tight mb-3">
                  Create New Post
                </h1>
                <p className="font-mono text-sm text-neutral-600 max-w-2xl">
                  Compose and schedule content across multiple platforms with
                  media support.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column: Content (2/3) */}
              <div className="lg:col-span-2 space-y-6">
                {/* Section: Destination */}
                <div className="bg-brand-neon border-2 border-black p-6 shadow-hard relative overflow-hidden">
                  {/* Decorative corner elements */}
                  <div className="absolute top-0 right-0 w-16 h-16 border-l-2 border-b-2 border-black opacity-20"></div>
                  <div className="absolute bottom-0 left-0 w-12 h-12 border-r-2 border-t-2 border-black opacity-20"></div>

                  {/* Header */}
                  <div className="relative z-10 mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <h2 className="font-bold uppercase text-lg flex items-center gap-2">
                        <Icon
                          icon="solar:link-circle-linear"
                          className="text-xl"
                        />
                        Select Platforms
                      </h2>
                      {selectedPlatforms.length > 0 && (
                        <div className="flex items-center gap-2 px-3 py-1 bg-black text-white border-2 border-black">
                          <span className="font-mono text-xs font-bold">
                            {selectedPlatforms.length} SELECTED
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono bg-white px-2 py-1 border border-black">
                        MULTIPLE SELECT
                      </span>
                      {selectedPlatforms.length === 0 && (
                        <span className="font-mono text-xs text-neutral-600">
                          Choose one or more platforms
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Platform Selector */}
                  <div className="relative z-10">
                    <PlatformSelector
                      platforms={platforms}
                      selected={selectedPlatforms}
                      onToggle={togglePlatform}
                      isLoading={isLoadingPlatforms}
                      error={
                        platformsError
                          ? 'Failed to load platforms. Please try again.'
                          : null
                      }
                    />
                  </div>
                </div>

                {/* Section: Editor */}
                <ContentEditor
                  value={content}
                  onChange={setContent}
                  maxLength={280}
                  placeholder="Type your update here... Use @ to mention or # for tags."
                />

                {/* Section: Media */}
                <div className="bg-white border-2 border-black p-6 shadow-hard-sm relative overflow-hidden">
                  {/* Decorative accent line at top */}
                  <div className="absolute top-0 left-0 w-full h-2 bg-brand-red -translate-y-px"></div>
                  {/* Decorative corner element */}
                  <div className="absolute bottom-0 right-0 w-16 h-16 border-l-2 border-t-2 border-black opacity-20"></div>

                  {/* Header */}
                  <div className="relative z-10 mb-6 pt-1">
                    <div className="flex items-center justify-between mb-2">
                      <h2 className="font-bold uppercase text-lg flex items-center gap-2">
                        <Icon
                          icon="solar:gallery-wide-linear"
                          className="text-xl"
                        />
                        Attachments
                      </h2>
                      {mediaFiles.length > 0 && (
                        <div className="flex items-center gap-2 px-3 py-1 bg-brand-red text-white border-2 border-black shadow-hard-sm">
                          <Icon icon="solar:gallery-bold" className="text-sm" />
                          <span className="font-mono text-xs font-bold">
                            {mediaFiles.length} FILE
                            {mediaFiles.length !== 1 ? 'S' : ''}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono bg-neutral-100 px-2 py-1 border border-black">
                        IMAGES & VIDEOS
                      </span>
                      {mediaFiles.length === 0 && (
                        <span className="font-mono text-xs text-neutral-500">
                          Add media to enhance your post
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Media Uploader */}
                  <div className="relative z-10">
                    <MediaUploader
                      accept="image/*,video/mp4"
                      multiple
                      onUpload={handleFileUpload}
                      files={mediaFiles}
                      onRemove={removeFile}
                    />
                  </div>
                </div>
              </div>

              {/* Right Column: Scheduling & Settings (1/3) */}
              <div className="space-y-6">
                {/* Timing Control */}
                <SchedulePicker
                  isScheduled={isScheduled}
                  onScheduledChange={setIsScheduled}
                  scheduleDate={scheduleDate}
                  onDateChange={setScheduleDate}
                />

                {/* Post Metadata */}
                <div className="bg-white border-2 border-black p-6 shadow-hard-sm">
                  <h2 className="font-bold uppercase text-sm mb-4">
                    Post Metadata
                  </h2>

                  <div className="space-y-4">
                    <div>
                      <label className="font-mono text-[10px] uppercase block mb-2">
                        Internal Tags
                      </label>
                      <input
                        type="text"
                        value={internalTags}
                        onChange={(e) => setInternalTags(e.target.value)}
                        className="w-full p-2 text-xs font-mono border-2 border-black bg-white outline-none focus:shadow-[2px_2px_0px_0px_#ccff00] transition-shadow"
                        placeholder="e.g. #campaign-alpha #q4-2024"
                      />
                      <p className="font-mono text-[10px] text-neutral-500 mt-1">
                        Separate tags with spaces
                      </p>
                    </div>

                    <div className="pt-3 border-t border-dashed border-black">
                      <label className="font-mono text-[10px] uppercase block mb-2">
                        Platform-Specific Options
                      </label>
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={settings.shortenLinks}
                            onChange={(e) =>
                              setSettings({
                                ...settings,
                                shortenLinks: e.target.checked,
                              })
                            }
                            className="w-4 h-4 border-2 border-black appearance-none checked:bg-brand-neon checked:border-black"
                          />
                          <span className="font-mono text-xs">
                            Auto-shorten URLs
                          </span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={settings.autoRetweet}
                            onChange={(e) =>
                              setSettings({
                                ...settings,
                                autoRetweet: e.target.checked,
                              })
                            }
                            className="w-4 h-4 border-2 border-black appearance-none checked:bg-brand-neon checked:border-black"
                          />
                          <span className="font-mono text-xs text-neutral-500">
                            Auto-retweet (X/Twitter only)
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Main Actions */}
                <div className="space-y-3">
                  {isScheduled ? (
                    <Button
                      variant="primary"
                      className="w-full py-4 text-sm flex items-center justify-center gap-2 shadow-[4px_4px_0px_0px_#ccff00]! hover:shadow-[6px_6px_0px_0px_#ccff00]! active:shadow-[2px_2px_0px_0px_#ccff00]! hover:-translate-x-px! hover:-translate-y-px! active:translate-x-0.5! active:translate-y-0.5!"
                    >
                      <Icon icon="solar:rocket-linear" className="text-xl" />
                      Schedule Post
                    </Button>
                  ) : (
                    <Button
                      variant="primary"
                      className="w-full py-4 text-sm flex items-center justify-center gap-2 shadow-[4px_4px_0px_0px_#ccff00]! hover:shadow-[6px_6px_0px_0px_#ccff00]! active:shadow-[2px_2px_0px_0px_#ccff00]! hover:-translate-x-px! hover:-translate-y-px! active:translate-x-0.5! active:translate-y-0.5!"
                    >
                      <Icon icon="solar:rocket-linear" className="text-xl" />
                      Post Now
                    </Button>
                  )}

                  <Button
                    variant="secondary"
                    className="w-full py-4 text-sm flex items-center justify-center gap-2 border-2 border-black hover:bg-brand-neon hover:shadow-[2px_2px_0px_0px_#000] hover:-translate-y-0.5 hover:-translate-x-0.5 transition-all"
                  >
                    <Icon icon="solar:diskette-linear" className="text-xl" />
                    Save as Draft
                  </Button>
                </div>
              </div>
            </div>

            <PageFooter />
          </div>
        </div>
      </main>
    </div>
  );
};
