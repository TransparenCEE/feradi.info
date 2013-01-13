class VisualizationTranslation < ActiveRecord::Base
	require 'utf8_converter'
  has_permalink :create_permalink

	belongs_to :visualization
	has_one :image_file, :dependent => :destroy
	has_one :dataset_file, :dependent => :destroy
  accepts_nested_attributes_for :image_file
  accepts_nested_attributes_for :dataset_file

 attr_accessible :visualization_id, :locale, :title, :explanation,	:reporter,
									:designer,	:data_source_name, :permalink, :data_source_url,
									:interactive_url, :image_file_attributes,	:dataset_file_attributes


  validates :title, :permalink, :presence => true
	validates :title, :uniqueness => {:scope => :locale, :case_sensitive => false,
			:message => I18n.t('activerecord.errors.messages.already_exists')}
	validates :permalink, :uniqueness => {:scope => :locale, :case_sensitive => false,
			:message => I18n.t('activerecord.errors.messages.already_exists')}
	validates :interactive_url, :format => {:with => URI::regexp(['http','https'])}, :if => "!interactive_url.blank?"
	validates :data_source_url, :format => {:with => URI::regexp(['http','https'])}, :if => "!data_source_url.blank?"

  # when a record is published, the following fields must be provided
  # - reporter, designer, data source name
  # -> this method is called from the visualization model
  def validate_if_published
    missing_fields = []
    missing_fields << :title if !self.title || self.title.empty?
    missing_fields << :explanation if !self.explanation || self.explanation.empty?
    missing_fields << :reporter if !self.reporter || self.reporter.empty?
    missing_fields << :designer if !self.designer || self.designer.empty?
    missing_fields << :data_source_name if !self.data_source_name || self.data_source_name.empty?

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


	##############################
	## shortcut methods to get to
	## image file in image_file object
	##############################
	def image_record
		self.image_file
	end
	def image
		image_record.file if image_record
	end
	def image_file_name
		image_record.file_file_name if image_record
	end
	def image_is_cropped
		image_record.image_is_cropped if image_record
	end

	##############################
	## shortcut methods to get to
	## dataset file in dataset object
	##############################
	def dataset_record
		self.dataset_file
	end
	def dataset
		dataset_record.file if dataset_record
	end
	def dataset_file_name
		dataset_record.file_file_name if dataset_record
	end

end
