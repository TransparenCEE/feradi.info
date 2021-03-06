module Paperclip
  class Cropper < Thumbnail
    def transformation_command
      Rails.logger.debug('______________________________________________cropper module_________________')
      c = crop_command
      if c
        Rails.logger.debug('______________________________________________0' + super.first.inspect + '_________________')
        Rails.logger.debug('______________________________________________1' + c.inspect + '_________________')
        c# + super.first.sub(/ -crop \S+/, '')
      else
        super
        Rails.logger.debug('______________________________________________2' + super.inspect + '_________________')
      end
    end

    def crop_command
      Rails.logger.debug('______________________________________________3 - obj inst: ' + @attachment.instance.inspect + '_________________')
      target = @attachment.instance
      Rails.logger.debug('______________________________________________4 - is cropping: ' + target.cropping?.to_s + '_________________')
      if target.cropping?
        " -crop '#{target.crop_w.to_i}x#{target.crop_h.to_i}+#{target.crop_x.to_i}+#{target.crop_y.to_i}' -thumbnail '230x230^'"
      end
    end
  end
end
