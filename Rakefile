require "rubygems"
require "mongo"


namespace "test" do

  desc "Create test projects"
  task :projects do 

    projects = connection.collection("projects")
    projects.remove

    projects.insert(:name => "jericoacoara", :country => "brazil", :images => 
      ["1024/DSC02245_1024.jpg", "1024/DSC02262_1024.jpg", "1024/DSC02267_1024.jpg", "1024/DSC02280_1024.jpg", "1024/DSC02335_1024.jpg", "1024/DSC02359_1024.jpg", "1024/DSC02368_1024.jpg", "1024/DSC02373_1024.jpg", "1024/DSC02391_1024.jpg", "1024/DSC02392_2_1024.jpg", "1024/DSC02501_1024.jpg", "1024/DSC02506_1024.jpg", "1024/DSC02625_1024.jpg"]
    )
    projects.insert(:name => "recife antiguo", :country => "brazil", :images => 
      ["DSC02700.JPG", "DSC02750.JPG", "DSC02757.JPG", "DSC02765.JPG", "DSC02766.JPG", "DSC02768.jpg", "DSC02787.JPG"]
    )
    projects.insert(:name => "salvador", :country => "brazil", :images => 
      ["DSC02700.jpg", "DSC02750.jpg", "DSC02757.jpg", "DSC02765.jpg", "DSC02766.jpg", "DSC02768.jpg", "DSC02787.jpg"] 
    )
    puts "Created #{projects.count} projects"
  end

  task :upload_images do
    require "RMagick"
    require 'parallel'
    require 'benchmark'

    bench = Benchmark.measure do
      upload_images
    end
    puts bench
  end

  def upload_images 
    Dir["../Images/*"].each do |folder|
      project_name = folder[/.*\/(.*)$/, 1]
      projects = connection.collection("projects")
      project = projects.find_one(:name => project_name)

      next if project.nil?

      files = Dir["#{folder}/*jpg"]

      Parallel.each(files) do |file_name|  
        img = Magick::Image.read(file_name).first
        file = img.resize_to_fit(1024, 768)
        p "#{folder}/1024/#{File.basename(file_name, '.jpg')}_1024.jpg"
        file.write("#{folder}/1024/#{File.basename(file_name, '.jpg')}_1024.jpg")
      end

      p files = Dir["#{folder}/*jpg"].map { |file_name| "#{File.basename(file_name, '.jpg')}_1024.jpg" }
    end
  end

  def connection 
    ENV['MONGOHQ_URL'] = "mongodb://localhost/photography"

    db = URI.parse(ENV['MONGOHQ_URL'])
    db_name = db.path.gsub(/^\//, '')
    @db_connection = Mongo::Connection.new(db.host, db.port).db(db_name)
    @db_connection.authenticate(db.user, db.password) unless (db.user.nil? || db.user.nil?)
    @db_connection
  end 


end