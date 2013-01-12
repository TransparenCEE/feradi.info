class VisualizationTranslation < ActiveRecord::Base
	require 'utf8_converter'
  has_permalink :create_permalink

	belongs_to :visualization

	has_attached_file :visual,
    :url => "/system/visualizations/:visual_id/:permalink_:locale_:style.:extension",
		:styles => Proc.new { |attachment| attachment.instance.attachment_styles}
	#:convert_options => {
  #     :thumb => "-gravity north -thumbnail 230x230^ -extent 230x230"
  # },

  attr_accessible :visualization_id, :locale, :title, :explanation,	:reporter, :designer,	:data_source_name, :permalink,
			:interactive_url, :visual, :visual_file_name, :visual_content_type,
			:visual_is_cropped, :crop_x, :crop_y, :crop_w, :crop_h, :reset_crop
  attr_accessor :crop_x, :crop_y, :crop_w, :crop_h, :reset_crop

  validates :title, :presence => true
	validates :interactive_url, :format => {:with => URI::regexp(['http','https'])}

	# if this is a new record, do not apply the cropping processor
	# - the user must be able to set the crop size first
	def attachment_styles
	  if self.id.nil? || self.crop_x.nil? || self.crop_y.nil? || self.crop_w.nil? || self.crop_h.nil?
			{
		    :thumb => {:geometry => "230x230#"},
		    :medium => {:geometry => "600x>"},
		    :large => {:geometry => "900x>"}
		  }
		else
			{
		    :thumb => {:geometry => "230x230#", :processors => [:cropper]}
		  }
		end
	end

  after_update :reprocess_visual, :if => :cropping?

  def cropping?
    visual_is_cropped && !crop_x.blank? && !crop_y.blank? && !crop_w.blank? && !crop_h.blank?
  end

  def visual_geometry(style = :original)
    geometry ||= {}
    geometry[style] ||= Paperclip::Geometry.from_file(visual.path(style))
  end

  # when a record is published, the following fields must be provided
  # - reporter, designer, data source name
  # -> this method is called from the visualization model
  def validate_if_published
    missing_fields = []
    missing_fields << :title if self.title.blank?
    missing_fields << :explanation if self.explanation.blank?
    missing_fields << :reporter if self.reporter.blank?
    missing_fields << :designer if self.designer.blank?
    missing_fields << :data_source_name if self.data_source_name.blank?
=begin - doing this test in visualization model
		if is_infographic?
      missing_fields << :visual if !self.visual_file_name || self.visual_file_name.empty?
		elsif is_interactive?
      missing_fields << :interactive_url if !self.interactive_url || self.interactive_url.empty?
      missing_fields << :visual if !self.visual_file_name || self.visual_file_name.empty?
		end
=end
    if !missing_fields.empty?
      missing_fields.each do |field|
        errors.add(field, I18n.t('activerecord.errors.messages.published_visual_missing_fields'))
      end
    end

    return missing_fields
  end


  def create_permalink
    Utf8Converter.convert_ka_to_en(self.title) if self.title
  end

  def self.get_visual_id(permalink)
    x = select(:visualization_id).where(:permalink => permalink, :locale => I18n.locale).first
		if x
			return x.visualization_id
		else
			nil
		end
  end



private
   def reprocess_visual
     visual.reprocess!
   end

end
