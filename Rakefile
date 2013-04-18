require "rubygems"
require "mongo"
require "RMagick"
require 'parallel'
require 'benchmark'
require 'aws/s3'

AWS::S3::DEFAULT_HOST.replace "s3-us-west-2.amazonaws.com"

IMAGE_SIZES = { :"1024" => [1024, 768] }

task :deploy do
  sh "git push heroku master"
  sh "heroku run 'rake test:projects'"
end

namespace "test" do

  desc "Create test projects"
  task :projects do 

    projects = connection.collection("projects")
    projects.remove

    projects.insert(:name => "jericoacoara", :country => "brazil", :images => 
      ["1024/DSC02245_1024.jpg", "1024/DSC02262_1024.jpg", "1024/DSC02267_1024.jpg", "1024/DSC02280_1024.jpg", "1024/DSC02335_1024.jpg", "1024/DSC02359_1024.jpg", "1024/DSC02373_1024.jpg", "1024/DSC02391_1024.jpg", "1024/DSC02392_2_1024.jpg", "1024/DSC02501_1024.jpg", "1024/DSC02506_1024.jpg", "1024/DSC02625_1024.jpg"]
    )
    projects.insert(:name => "trees", :country => "houston", :images => 
      ["trees/1024/DSC00921_1024.jpg", "trees/1024/DSC00923_1024.jpg", "trees/1024/DSC00925_1024.jpg", "trees/1024/DSC00926_1024.jpg", "trees/1024/DSC00931_1024.jpg", "trees/1024/DSC00940_1024.jpg"]
    )
    projects.insert(:name => "recife antiguo", :country => "brazil", :images => 
      ["DSC02700.JPG", "DSC02750.JPG", "DSC02757.JPG", "DSC02765.JPG", "DSC02766.JPG", "DSC02768.jpg", "DSC02787.JPG"]
    )
    projects.insert(:name => "salvador", :country => "brazil", :images => 
      ["DSC02700.jpg", "DSC02750.jpg", "DSC02757.jpg", "DSC02765.jpg", "DSC02766.jpg", "DSC02768.jpg", "DSC02787.jpg"] 
    )
  end

  task :upload_images do
    upload_images
  end


  def upload_images
    amazon_connection
    Dir["../Images/*"].each do |folder|
      project_name = folder[/.*\/(.*)$/, 1]
      projects = connection.collection("projects")
      project = projects.find_one(:name => project_name)

      next if project.nil?

      files = Dir["#{folder}/*jpg"]

      IMAGE_SIZES.each do |key, sizes|
        resized_files = Parallel.map(files) do |file_name|  
          path = resize_image file_name, folder, key, sizes
          AWS::S3::S3Object.store("#{project_name}/#{key}/" + File.basename(path), open(path), 'photogaphy', :access => :public_read)
          path
        end
        p resized_files.map {|file_name| "#{project_name}/#{key}/" + File.basename(file_name) }
      end
    end
  end

  def resize_image file_name, folder, key, sizes
    img = Magick::Image.read(file_name).first
    file = img.resize_to_fit(sizes[0], sizes[1])
    resized_file_path = "#{folder}/#{key}/#{File.basename(file_name, '.jpg')}_#{key}.jpg"
    file.write(resized_file_path)
    resized_file_path
  end

  def amazon_connection
    AWS::S3::Base.establish_connection!(
      :access_key_id     => 'AKIAI57M7BNHWXDHE6YQ',
      :secret_access_key => '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'
    )
  end

  def connection 
    db = URI.parse(ENV['MONGOHQ_URL'])
    db_name = db.path.gsub(/^\//, '')
    @db_connection = Mongo::Connection.new(db.host, db.port).db(db_name)
    @db_connection.authenticate(db.user, db.password) unless (db.user.nil? || db.user.nil?)
    @db_connection
  end 
end