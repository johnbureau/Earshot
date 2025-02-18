import { useEffect, useRef } from 'react';
import { format, parseISO } from 'date-fns/esm';
import html2canvas from 'html2canvas'; // You'll need to install this package

function SocialPreview({ 
  template, 
  events, 
  image, 
  customization,
  onImageGenerated,
  imageDimensions
}) {
  const previewRef = useRef(null);

  const formatDate = (dateString, formatStr) => {
    try {
      // Check if dateString is valid
      if (!dateString) return '';
      
      // If it's already a Date object
      if (dateString instanceof Date) {
        return format(dateString, formatStr);
      }
      
      // If it's a string, parse it first
      const date = parseISO(dateString);
      if (isNaN(date.getTime())) {
        console.error('Invalid date:', dateString);
        return '';
      }
      
      return format(date, formatStr);
    } catch (error) {
      console.error('Date formatting error:', error);
      return '';
    }
  };

  const generateImage = async () => {
    if (previewRef.current) {
      try {
        const canvas = await html2canvas(previewRef.current);
        const imageUrl = canvas.toDataURL('image/png');
        onImageGenerated(imageUrl);
      } catch (error) {
        console.error('Image generation error:', error);
      }
    }
  };

  const getTemplateStyle = () => {
    const { platform, colors, font, layout, textPosition } = customization;
    
    const baseStyles = {
      fontFamily: font,
      backgroundColor: colors.background,
      color: colors.text,
    };

    // If we have an image with dimensions, use those to set the aspect ratio
    if (image && imageDimensions) {
      const [width, height] = imageDimensions.split('x').map(Number);
      const maxWidth = 1200; // Maximum width for preview
      const scaledHeight = (height * maxWidth) / width;
      
      return {
        ...baseStyles,
        aspectRatio: `${width}/${height}`,
        maxWidth: `${maxWidth}px`,
        height: `${scaledHeight}px`,
        margin: '0 auto',
      };
    }

    // Default platform-based aspect ratios
    const aspectRatios = {
      instagram: 'aspect-square',
      facebook: 'aspect-video',
      twitter: 'aspect-[1.91/1]',
      linkedin: 'aspect-[1.91/1]',
    };

    return {
      ...baseStyles,
      aspectRatio: platform ? aspectRatios[platform] : 'aspect-square',
    };
  };

  const getContentPosition = (position) => {
    const positions = {
      'top-left': 'items-start justify-start',
      'top': 'items-start justify-center',
      'top-right': 'items-start justify-end',
      'left': 'items-center justify-start',
      'center': 'items-center justify-center',
      'right': 'items-center justify-end',
      'bottom-left': 'items-end justify-start',
      'bottom': 'items-end justify-center',
      'bottom-right': 'items-end justify-end',
    };
    return positions[position] || positions.center;
  };

  const renderTemplate = () => {
    if (!events || events.length === 0) {
      return (
        <div className="h-full flex items-center justify-center text-gray-500">
          No events selected
        </div>
      );
    }

    switch (template) {
      case 'single':
        return (
          <div className={`relative h-full p-6 flex ${getContentPosition(customization.textPosition)}`}>
            {image && (
              <div className="absolute inset-0">
                <img src={image} alt="Background" className="w-full h-full object-cover" />
                {customization.textBackgroundEnabled && (
                  <div className="absolute inset-0" style={{ backgroundColor: customization.colors.textBackground }} />
                )}
              </div>
            )}
            <div className="relative z-10 flex flex-col h-full justify-center">
              <h2 className="text-3xl font-bold mb-4">{events[0]?.title || 'Event Title'}</h2>
              <p className="text-xl mb-2">{events[0]?.venue || 'Venue'}</p>
              <p className="text-lg">
                {events[0]?.date ? formatDate(events[0].date, 'MMMM d, yyyy') : 'Date TBD'}
              </p>
            </div>
          </div>
        );

      case 'grid':
        return (
          <div className={`relative h-full p-4 flex ${getContentPosition(customization.textPosition)}`}>
            {image && (
              <div className="absolute inset-0">
                <img src={image} alt="Background" className="w-full h-full object-cover" />
                {customization.textBackgroundEnabled && (
                  <div className="absolute inset-0" style={{ backgroundColor: customization.colors.textBackground }} />
                )}
              </div>
            )}
            <div className="relative z-10 grid grid-cols-2 gap-4 h-full">
              {events.slice(0, 4).map((event, index) => (
                <div key={index} className="bg-black bg-opacity-30 p-4 rounded-lg">
                  <h3 className="font-bold mb-2">{event.title || 'Event Title'}</h3>
                  <p className="text-sm">{event.venue || 'Venue'}</p>
                  <p className="text-sm">
                    {event.date ? formatDate(event.date, 'MMM d') : 'Date TBD'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'list':
        return (
          <div className={`relative h-full p-6 flex ${getContentPosition(customization.textPosition)}`}>
            {image && (
              <div className="absolute inset-0">
                <img src={image} alt="Background" className="w-full h-full object-cover" />
                {customization.textBackgroundEnabled && (
                  <div className="absolute inset-0" style={{ backgroundColor: customization.colors.textBackground }} />
                )}
              </div>
            )}
            <div className="relative z-10 flex flex-col h-full">
              <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
              <div className="space-y-4">
                {events.map((event, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-black bg-opacity-30 rounded-lg flex items-center justify-center">
                      <span className="font-bold text-center">
                        {event.date ? formatDate(event.date, 'MMM\nd') : 'TBD'}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-bold">{event.title || 'Event Title'}</h3>
                      <p className="text-sm">{event.venue || 'Venue'}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  useEffect(() => {
    generateImage();
  }, [template, events, image, customization]);

  return (
    <div 
      ref={previewRef}
      className="w-full rounded-lg overflow-hidden"
      style={getTemplateStyle()}
    >
      {renderTemplate()}
    </div>
  );
}

export default SocialPreview; 