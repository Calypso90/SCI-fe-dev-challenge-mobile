import axios from "axios";
import { fetchCatalog, searchCards } from "../api";

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("API Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("fetchCatalog gets HP values", async () => {
    const mockData = ["1", "2", "3"];
    mockedAxios.get.mockResolvedValueOnce({ data: { data: mockData } });

    const result = await fetchCatalog();
    expect(mockedAxios.get).toHaveBeenCalledWith(
      `http://localhost:8010/proxy/catalog/hps`
    );
    expect(result.data).toEqual(["1", "2", "3"]); // This will fail
  });

  it("searchCards queries by HP", async () => {
    const mockData = [{ id: 1, name: "Test Card" }];
    mockedAxios.get.mockResolvedValueOnce({ data: { data: mockData } });

    const result = await searchCards("2");
    expect(mockedAxios.get).toHaveBeenCalledWith(
      "http://localhost:8010/proxy/cards/search",
      {
        params: {
          q: "h=2",
          pretty: true,
        },
      }
    );
    expect(result.data).toEqual(mockData);
  });
});
