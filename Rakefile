require "rubygems"
require "mongo"

namespace "test" do

  desc "Create test projects"
  task :projects do 
    db = URI.parse(ENV['MONGOHQ_URL'])
    db_name = db.path.gsub(/^\//, '')
    @db_connection = Mongo::Connection.new(db.host, db.port).db(db_name)
    @db_connection.authenticate(db.user, db.password) unless (db.user.nil? || db.user.nil?)
    @db_connection
    
    projects = @db_connection.collection("projects")
    projects.remove

    projects.insert(:name => "jeicoacoara", :country => "brazil", :images => 
      ["DSC02245.JPG", "DSC02359.JPG", "DSC02362.JPG", "DSC02392_2.JPG", "DSC02482.JPG", "DSC02496.JPG"]
    )
    projects.insert(:name => "recife antiguo", :country => "brazil", :images => 
      ["DSC02700.JPG", "DSC02750.JPG", "DSC02757.JPG", "DSC02765.JPG", "DSC02766.JPG", "DSC02768.jpg", "DSC02787.JPG"]
    )
    projects.insert(:name => "salvador", :country => "brazil", :images => 
      ["DSC02700.jpg", "DSC02750.jpg", "DSC02757.jpg", "DSC02765.jpg", "DSC02766.jpg", "DSC02768.jpg", "DSC02787.jpg"] 
    )

    puts "Created #{projects.count} projects"
  end
end