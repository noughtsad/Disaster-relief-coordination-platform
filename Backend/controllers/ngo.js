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

    await newNgo.save();
    return res.status(201).json({ ngo: newNgo });
  } catch (error) {
    console.error("Error creating NGO:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
}

export async function getNgo(req, res) {
  try {
    const ngo = await Ngo.findById(req.params.id).populate("owner", "username email");
    if (!ngo) {
      return res.status(404).json({ message: "NGO not found" });
    }
    return res.status(200).json(ngo);
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
