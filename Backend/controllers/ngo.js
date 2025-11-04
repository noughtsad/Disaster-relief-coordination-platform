import Ngo from "../models/Ngo.js";

export async function createNgo(req, res) {
  try {
    const { ngoName, ngoLatitude, ngoLongitude, ngoContact, ngoDescription } = req.body;

    if (!ngoName || !ngoLatitude || !ngoLongitude || !ngoContact) {
      return res.status(400).json({ message: "All required fields must be provided" });
    }

    const newNgo = new Ngo({
      ngoName,
      ngoLatitude,
      ngoLongitude,
      ngoContact,
      ngoDescription,
      owner: req.user.id,
    });

    console.log("Creating NGO for owner:", req.user.id);
    await newNgo.save();
    return res.status(201).json({ ngo: newNgo });
  } catch (error) {
    console.error("Error creating NGO:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
}

export async function getNgo(req, res) {
  try {
    const ngo = await Ngo.findOne({ owner: req.user.id }).populate("owner", "username email");
    if (!ngo) {
      console.log("No NGO found for user:", req.user.id);
      return res.status(404).json({ message: "NGO not found for this user" });
    }
    return res.status(200).json({ ngo }); // Wrap ngo in an object to match frontend expectation
  } catch (error) {
    console.error("Error fetching NGO:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
}

export async function updateNgo(req, res) {
  try {
    const ngo = await Ngo.findById(req.params.id);
    if (!ngo) {
      return res.status(404).json({ message: "NGO not found" });
    }
    if (ngo.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to update this NGO" });
    }

    const updatedNgo = await Ngo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    return res.status(200).json(updatedNgo);
  } catch (error) {
    console.error("Error updating NGO:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
}

export async function updateMyNgo(req, res) {
  try {
    const { ngoName, ngoLatitude, ngoLongitude, ngoContact, ngoDescription } = req.body;
    
    const ngo = await Ngo.findOne({ owner: req.user.id });
    if (!ngo) {
      return res.status(404).json({ message: "NGO not found for this user" });
    }

    // Update fields if provided
    if (ngoName) ngo.ngoName = ngoName;
    if (ngoLatitude) ngo.ngoLatitude = ngoLatitude;
    if (ngoLongitude) ngo.ngoLongitude = ngoLongitude;
    if (ngoContact) ngo.ngoContact = ngoContact;
    if (ngoDescription !== undefined) ngo.ngoDescription = ngoDescription;

    await ngo.save();

    return res.status(200).json({ 
      message: "NGO profile updated successfully",
      ngo 
    });
  } catch (error) {
    console.error("Error updating NGO:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
}

export async function deleteNgo(req, res) {
  try {
    const ngo = await Ngo.findById(req.params.id);
    if (!ngo) {
      return res.status(404).json({ message: "NGO not found" });
    }
    if (ngo.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to delete this NGO" });
    }
    await ngo.deleteOne();
    return res.status(200).json({ message: "NGO deleted successfully" });
  } catch (error) {
    console.error("Error deleting NGO:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
}

export async function getAllNgos(req, res) {
  try {
    const ngos = await Ngo.find().populate("owner", "name email");
    return res.status(200).json({ ngos });
  } catch (error) {
    console.error("Error fetching all NGOs:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
}
