import { Icon } from '@iconify/react';
import { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { PageFooter } from '@/components/layout/PageFooter';
import { Toggle } from '@/components/ui/Toggle';
import { Button } from '@/components/ui/Button';

export const ComposePage = () => {
  const [isScheduled, setIsScheduled] = useState(true);
  const [content, setContent] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([
    'twitter',
    'linkedin',
  ]);
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

  const platforms = [
    { id: 'twitter', name: 'Twitter', icon: 'carbon:logo-x' },
    { id: 'linkedin', name: 'LinkedIn', icon: 'carbon:logo-linkedin' },
    { id: 'facebook', name: 'Facebook', icon: 'carbon:logo-facebook' },
    { id: 'instagram', name: 'Insta', icon: 'carbon:logo-instagram' },
  ];

  const togglePlatform = (platformId: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platformId)
        ? prev.filter((id) => id !== platformId)
        : [...prev, platformId]
    );
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setMediaFiles([...mediaFiles, ...Array.from(files)]);
    }
  };

  const removeFile = (index: number) => {
    setMediaFiles(mediaFiles.filter((_, i) => i !== index));
  };

  return (
    <div className="flex h-screen w-screen">
      <Sidebar />

      <main className="flex-1 flex flex-col h-full overflow-hidden bg-[#f8f8f8] relative">
        <div
          className="absolute inset-0 z-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: 'radial-gradient(#aaa 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />

        {/* Header */}
        <header className="h-16 border-b-2 border-black bg-white flex justify-between items-center px-4 lg:px-8 z-10 shrink-0">
          <div className="flex items-center gap-2 font-mono text-xs md:text-sm">
            <span className="text-neutral-400">HOME</span>
            <span className="text-neutral-300">/</span>
            <span className="font-bold">COMPOSE</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="px-4 py-2 text-xs font-bold uppercase tracking-wide border-2 border-black bg-white shadow-hard-sm hover:shadow-hard hover:-translate-x-px hover:-translate-y-px active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all">
              Save Draft
            </button>
          </div>
        </header>

        {/* Scrollable Form Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 z-10">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Content (2/3) */}
            <div className="lg:col-span-2 space-y-6">
              {/* Section: Destination */}
              <div className="bg-white border-2 border-black p-6 shadow-hard-sm">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-bold uppercase text-sm flex items-center gap-2">
                    <Icon icon="solar:link-circle-linear" className="text-lg" />
                    Select Platforms
                  </h2>
                  <span className="text-[10px] font-mono bg-neutral-100 px-2 py-1 border border-black">
                    MULTIPLE SELECT
                  </span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {platforms.map((platform) => (
                    <label key={platform.id} className="cursor-pointer">
                      <input
                        type="checkbox"
                        className="hidden"
                        checked={selectedPlatforms.includes(platform.id)}
                        onChange={() => togglePlatform(platform.id)}
                      />
                      <div
                        className={`flex items-center justify-center gap-2 w-full p-3 border-2 border-black transition-all ${
                          selectedPlatforms.includes(platform.id)
                            ? 'bg-brand-neon shadow-hard-sm -translate-px opacity-100 font-bold'
                            : 'bg-white opacity-60'
                        }`}
                      >
                        <Icon icon={platform.icon} />
                        <span className="font-mono text-xs">
                          {platform.name}
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Section: Editor */}
              <div className="bg-white border-2 border-black p-6 shadow-hard relative">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-bold uppercase text-sm flex items-center gap-2">
                    <Icon
                      icon="solar:pen-new-square-linear"
                      className="text-lg"
                    />
                    Content Payload
                  </h2>
                  {/* <button className="text-xs font-mono hover:underline flex items-center gap-1">
                    <Icon icon="solar:magic-stick-3-linear" /> AI Assist
                  </button> */}
                </div>

                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full h-64 border-0 outline-none resize-none font-mono text-sm leading-relaxed p-2 -ml-2 bg-transparent"
                  placeholder="Type your update here... Use @ to mention or # for tags."
                />

                <div className="flex justify-between items-center pt-4 border-t-2 border-neutral-100 mt-2">
                  <div className="flex gap-2 text-neutral-400">
                    <button className="hover:text-black">
                      <Icon
                        icon="solar:smile-circle-linear"
                        className="text-xl"
                      />
                    </button>
                    <button className="hover:text-black">
                      <Icon
                        icon="solar:hashtag-square-linear"
                        className="text-xl"
                      />
                    </button>
                    <button className="hover:text-black">
                      <Icon icon="solar:map-point-linear" className="text-xl" />
                    </button>
                  </div>
                  <div className="font-mono text-xs">
                    <span
                      className={`font-bold ${
                        content.length > 280
                          ? 'text-brand-red'
                          : 'text-green-600'
                      }`}
                    >
                      {content.length}
                    </span>
                    <span className="text-neutral-400">/280</span>
                  </div>
                </div>
              </div>

              {/* Section: Media */}
              <div className="bg-white border-2 border-black p-6 shadow-hard-sm">
                <h2 className="font-bold uppercase text-sm mb-4 flex items-center gap-2">
                  <Icon icon="solar:gallery-wide-linear" className="text-lg" />
                  Attachments
                </h2>

                {/* Upload Area */}
                <label className="block w-full p-8 border-2 border-dashed border-black bg-[#f8f8f8] hover:bg-white hover:border-solid hover:shadow-hard-sm transition-all cursor-pointer text-center group">
                  <input
                    type="file"
                    multiple
                    accept="image/*,video/mp4"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <Icon
                    icon="solar:cloud-upload-linear"
                    className="text-4xl mb-3 text-neutral-400 group-hover:text-black transition-colors mx-auto"
                  />
                  <p className="font-bold text-sm">Drop assets here</p>
                  <p className="font-mono text-xs text-neutral-500 mt-1">
                    JPG, PNG, MP4 up to 50MB
                  </p>
                  <div className="mt-4 inline-block px-4 py-2 border border-black bg-white text-xs font-mono uppercase hover:bg-black hover:text-white transition-colors">
                    Browse Files
                  </div>
                </label>

                {/* Preview List */}
                {mediaFiles.length > 0 && (
                  <div className="mt-4 flex gap-4 overflow-x-auto pb-2">
                    {mediaFiles.map((file, index) => (
                      <div
                        key={index}
                        className="relative w-24 h-24 border border-black shrink-0 bg-neutral-100"
                      >
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-full object-cover grayscale"
                        />
                        <button
                          onClick={() => removeFile(index)}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-brand-red border border-black text-white flex items-center justify-center hover:scale-110 transition-transform"
                        >
                          <Icon icon="solar:trash-bin-minimalistic-linear" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Scheduling & Settings (1/3) */}
            <div className="space-y-6">
              {/* Timing Control */}
              <div className="bg-brand-neon border-2 border-black p-6 shadow-hard relative">
                <div className="absolute top-2 right-2">
                  <Icon
                    icon="solar:clock-circle-linear"
                    className="text-2xl opacity-50"
                  />
                </div>
                <h2 className="font-bold uppercase text-lg mb-6">Timing</h2>

                {/* Toggle Switch */}
                <div className="flex items-center justify-between mb-6 bg-white/50 p-2 border border-black">
                  <span className="font-mono text-xs font-bold uppercase">
                    Schedule Post?
                  </span>
                  <Toggle
                    checked={isScheduled}
                    onChange={setIsScheduled}
                    label=""
                  />
                </div>

                {/* Date Picker UI */}
                {isScheduled && (
                  <div className="space-y-4">
                    <div className="flex flex-col gap-1">
                      <label className="font-mono text-[10px] uppercase">
                        Date
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={scheduleDate.day}
                          onChange={(e) =>
                            setScheduleDate({
                              ...scheduleDate,
                              day: e.target.value,
                            })
                          }
                          className="w-12 bg-white text-center border-2 border-black p-2 font-mono text-sm outline-none"
                          placeholder="DD"
                        />
                        <input
                          type="text"
                          value={scheduleDate.month}
                          onChange={(e) =>
                            setScheduleDate({
                              ...scheduleDate,
                              month: e.target.value,
                            })
                          }
                          className="w-14 bg-white text-center border-2 border-black p-2 font-mono text-sm outline-none"
                          placeholder="MM"
                        />
                        <input
                          type="text"
                          value={scheduleDate.year}
                          onChange={(e) =>
                            setScheduleDate({
                              ...scheduleDate,
                              year: e.target.value,
                            })
                          }
                          className="flex-1 bg-white text-center border-2 border-black p-2 font-mono text-sm outline-none"
                          placeholder="YYYY"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="font-mono text-[10px] uppercase">
                        Time (UTC)
                      </label>
                      <div className="flex gap-2 items-center">
                        <input
                          type="text"
                          value={scheduleDate.hour}
                          onChange={(e) =>
                            setScheduleDate({
                              ...scheduleDate,
                              hour: e.target.value,
                            })
                          }
                          className="w-12 bg-white text-center border-2 border-black p-2 font-mono text-sm outline-none"
                          placeholder="HH"
                        />
                        <span className="font-bold">:</span>
                        <input
                          type="text"
                          value={scheduleDate.minute}
                          onChange={(e) =>
                            setScheduleDate({
                              ...scheduleDate,
                              minute: e.target.value,
                            })
                          }
                          className="w-12 bg-white text-center border-2 border-black p-2 font-mono text-sm outline-none"
                          placeholder="MM"
                        />
                        <div className="flex flex-1 border-2 border-black bg-white">
                          <button
                            onClick={() =>
                              setScheduleDate({ ...scheduleDate, period: 'AM' })
                            }
                            className={`flex-1 font-mono text-xs p-2 transition-colors ${
                              scheduleDate.period === 'AM'
                                ? 'bg-black text-white'
                                : 'hover:bg-black hover:text-white'
                            }`}
                          >
                            AM
                          </button>
                          <button
                            onClick={() =>
                              setScheduleDate({ ...scheduleDate, period: 'PM' })
                            }
                            className={`flex-1 font-mono text-xs p-2 transition-colors ${
                              scheduleDate.period === 'PM'
                                ? 'bg-black text-white'
                                : 'hover:bg-black hover:text-white'
                            }`}
                          >
                            PM
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Additional Settings */}
              <div className="bg-white border-2 border-black p-6 shadow-hard-sm">
                <h2 className="font-bold uppercase text-sm mb-4">
                  Post Settings
                </h2>

                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div
                      className={`w-5 h-5 border-2 border-black flex items-center justify-center bg-white group-hover:bg-neutral-100 ${
                        settings.shortenLinks ? '' : ''
                      }`}
                      onClick={() =>
                        setSettings({
                          ...settings,
                          shortenLinks: !settings.shortenLinks,
                        })
                      }
                    >
                      {settings.shortenLinks && (
                        <Icon
                          icon="solar:check-read-linear"
                          className="text-black text-sm"
                        />
                      )}
                    </div>
                    <span className="font-mono text-xs">Shorten Links</span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div
                      className="w-5 h-5 border-2 border-black flex items-center justify-center bg-white group-hover:bg-neutral-100"
                      onClick={() =>
                        setSettings({
                          ...settings,
                          autoRetweet: !settings.autoRetweet,
                        })
                      }
                    >
                      {settings.autoRetweet && (
                        <Icon
                          icon="solar:check-read-linear"
                          className="text-black text-sm"
                        />
                      )}
                    </div>
                    <span className="font-mono text-xs text-neutral-500">
                      Auto-Retweet (X only)
                    </span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div
                      className="w-5 h-5 border-2 border-black flex items-center justify-center bg-white group-hover:bg-neutral-100"
                      onClick={() =>
                        setSettings({
                          ...settings,
                          addFirstComment: !settings.addFirstComment,
                        })
                      }
                    >
                      {settings.addFirstComment && (
                        <Icon
                          icon="solar:check-read-linear"
                          className="text-black text-sm"
                        />
                      )}
                    </div>
                    <span className="font-mono text-xs">Add First Comment</span>
                  </label>
                </div>

                <div className="mt-4 pt-4 border-t border-dashed border-black">
                  <label className="font-mono text-[10px] uppercase block mb-1">
                    Internal Tags
                  </label>
                  <input
                    type="text"
                    value={internalTags}
                    onChange={(e) => setInternalTags(e.target.value)}
                    className="w-full p-2 text-xs font-mono border-2 border-black bg-white outline-none focus:shadow-[2px_2px_0px_0px_#ccff00] transition-shadow"
                    placeholder="e.g. #campaign-alpha"
                  />
                </div>
              </div>

              {/* Main Actions */}
              {isScheduled ? (
                <Button
                  variant="primary"
                  className="w-full py-4 text-sm flex items-center justify-center gap-1 shadow-[4px_4px_0px_0px_#ccff00]! hover:shadow-[6px_6px_0px_0px_#ccff00]! active:shadow-[2px_2px_0px_0px_#ccff00]! hover:-translate-x-px! hover:-translate-y-px! active:translate-x-0.5! active:translate-y-0.5!"
                >
                  <Icon icon="solar:rocket-linear" className="text-xl" />
                  Schedule Post
                </Button>
              ) : (
                <Button
                  variant="primary"
                  className="w-full py-4 text-sm flex items-center justify-center gap-1 shadow-[4px_4px_0px_0px_#ccff00]! hover:shadow-[6px_6px_0px_0px_#ccff00]! active:shadow-[2px_2px_0px_0px_#ccff00]! hover:-translate-x-px! hover:-translate-y-px! active:translate-x-0.5! active:translate-y-0.5!"
                >
                  <Icon icon="solar:rocket-linear" className="text-xl" />
                  Post Now
                </Button>
              )}
            </div>
          </div>

          <PageFooter />
        </div>
      </main>
    </div>
  );
};
